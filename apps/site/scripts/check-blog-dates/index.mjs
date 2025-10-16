import generateBlogData from '../../next-data/generators/blogData.mjs';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Checks all blog posts for future publish dates.
 *
 * This is a pure function that analyzes blog post dates and returns
 * information about posts scheduled in the future.
 *
 * @param {Date} currentDate - The date to compare against (defaults to now)
 * @param {Function} blogDataGenerator - Function to generate blog data (for testing)
 * @returns {Promise<Object>} Object containing futurePosts array and hasFuturePosts boolean
 */
export async function checkBlogDates(
  currentDate = new Date(),
  blogDataGenerator = generateBlogData
) {
  const blogData = await blogDataGenerator();

  const futurePosts = blogData.posts.reduce((acc, post) => {
    const postDate = new Date(post.date);

    if (postDate > currentDate) {
      acc.push({
        slug: post.slug,
        title: post.title,
        date: postDate.toISOString(),
        daysInFuture: Math.ceil(
          (postDate - currentDate) / MILLISECONDS_PER_DAY
        ),
      });
    }

    return acc;
  }, []);

  return { futurePosts, hasFuturePosts: futurePosts.length > 0 };
}

/**
 * Checks blog dates and formats the results for GitHub Actions output.
 *
 * This function filters results to only posts that are in the current PR.
 * If not running in a PR context, no results will be returned.
 *
 * Note: This function must be run from the apps/site directory.
 *
 * @param {Object} params - GitHub Actions utilities
 * @param {Object} params.core - GitHub Actions core utilities for setting outputs
 * @param {Object} params.github - GitHub API client (required for PR filtering)
 * @param {Object} params.context - GitHub Actions context (required for PR filtering)
 * @param {Function} params.blogDataGenerator - Blog data generator function (for testing)
 */
export async function checkAndFormatBlogDates({
  core,
  github,
  context,
  blogDataGenerator = checkBlogDates,
}) {
  if (!github || !context?.payload?.pull_request) {
    core.info('Not running in a PR context, skipping future date checks');
    core.setOutput('FUTURE_POSTS_JSON', '[]');
    return;
  }

  const { futurePosts } = await blogDataGenerator();

  core.setOutput('FUTURE_POSTS_JSON', JSON.stringify(futurePosts));
}
