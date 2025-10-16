// Constants
export const BOT_USER_LOGIN = 'github-actions[bot]';
export const COMMENT_IDENTIFIER = '<!-- future-blog-posts-check -->';

// ============================================================================
// TABLE FORMATTING
// ============================================================================

/**
 * Formats a table row for a future post
 */
function formatPostRow(post) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const dayText = post.daysInFuture === 1 ? 'day' : 'days';
  const daysUntil = `${post.daysInFuture} ${dayText}`;
  const status = 'Scheduled';

  return `${post.slug} | ${date} | ${daysUntil} | ${status}`;
}

/**
 * Builds the comment body with a table of future posts
 */
export function buildCommentBody(futurePosts) {
  if (futurePosts.length === 0) {
    return `${COMMENT_IDENTIFIER}
## Future Blog Posts Status

All blog posts with future publish dates have been resolved.`;
  }

  const header = [
    `${COMMENT_IDENTIFIER}`,
    '## Future Blog Posts Detected',
    '',
    `**${futurePosts.length} post${futurePosts.length === 1 ? '' : 's'} scheduled in the future**, please make sure this date is correct.`,
    '',
    'Post | Scheduled Date | Time Until | Status',
    '| - | - | - | - |',
  ];

  const rows = futurePosts.map(formatPostRow);

  return [...header, ...rows].join('\n');
}

// ============================================================================
// COMMENT MANAGEMENT
// ============================================================================

/**
 * Finds existing bot comment on the PR
 */
async function findExistingComment({ github, requestContext }) {
  const { data: comments } = await github.rest.issues.listComments({
    ...requestContext,
  });

  return comments.find(
    comment =>
      comment.user.login === BOT_USER_LOGIN &&
      comment.body.includes(COMMENT_IDENTIFIER)
  );
}

/**
 * Creates or updates the PR comment with future posts status
 */
async function upsertComment({
  github,
  requestContext,
  commentBody,
  existingComment,
  core,
}) {
  try {
    if (existingComment) {
      await github.rest.issues.updateComment({
        owner: requestContext.owner,
        repo: requestContext.repo,
        comment_id: existingComment.id,
        body: commentBody,
      });
      core.info('Updated existing future posts comment');
      return;
    }

    await github.rest.issues.createComment({
      ...requestContext,
      body: commentBody,
    });
    core.info('Created new future posts comment');
    return;
  } catch (error) {
    core.warning(`Failed to upsert comment: ${error.message}`);
  }
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

/**
 * Creates or updates a PR comment for blog posts with future publish dates.
 *
 * Process:
 * 1. Parse future posts from environment
 * 2. Get current date to check for resolved posts
 * 3. Filter out posts that are resolved (current date >= post date)
 * 4. Build comment body with table format
 * 5. Create or update PR comment
 */
export async function createReviewForFutureDates({ github, context, core }) {
  // Parse environment - JSON string set by previous step in workflow
  const futurePostsJson = process.env.FUTURE_POSTS_JSON;
  if (!futurePostsJson) {
    core.info('No future posts found, skipping comment creation');
    return;
  }

  const allFuturePosts = JSON.parse(futurePostsJson);

  // Build request context
  const requestContext = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  };

  // Get current date/time
  const currentDate = new Date();

  core.info(
    `Checking future posts against current date: ${currentDate.toISOString()}`
  );

  // Filter out posts that are resolved (post date <= current date)
  const unresolvedPosts = allFuturePosts.filter(
    post => new Date(post.date) > currentDate
  );

  core.info(
    `Found ${unresolvedPosts.length} unresolved future post(s) (${allFuturePosts.length - unresolvedPosts.length} resolved by date)`
  );

  // Find existing comment
  const existingComment = await findExistingComment({ github, requestContext });

  // Build comment body
  const commentBody = buildCommentBody(unresolvedPosts);

  // Create or update comment
  await upsertComment({
    github,
    requestContext,
    commentBody,
    existingComment,
    core,
  });
}
