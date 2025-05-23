// Configuration defaults
const DEFAULTS = {
  ORG: 'nodejs',
  TEAM_SLUG: 'nodejs-website',
  REPO: 'nodejs.org',
  MONTHS_INACTIVE: 12,
  ISSUE: {
    TITLE: 'Inactive Collaborators Report',
    LABELS: ['inactive-collaborators', 'meta'],
  },
};

/**
 * Gets a date string from X months ago
 */
function getDateMonthsAgo(months) {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
}

/**
 * Checks if a member has had activity since the cutoff date
 */
async function isActiveMember(username, cutoffDate, github, repo) {
  // Check for commits first
  const commitQuery = `author:${username} repo:${repo} committer-date:>=${cutoffDate}`;
  const { data: commitData } = await github.rest.search.commits({
    q: commitQuery,
    per_page: 1,
  });
  if (commitData.total_count > 0) return true;

  // Then check for issue/PR activity
  const issueQuery = `involves:${username} repo:${repo} updated:>=${cutoffDate}`;
  const { data: issueData } = await github.rest.search.issuesAndPullRequests({
    q: issueQuery,
    per_page: 1,
    advanced_search: true,
  });
  return issueData.total_count > 0;
}

/**
 * Formats the issue body with inactive members information
 */
function formatIssueBody(inactiveMembers, cutoffDate) {
  const now = getDateMonthsAgo(0);
  let body = `# ${DEFAULTS.ISSUE.TITLE}\n\n`;
  body += `Last updated: ${now}\n`;
  body += `Checking for inactivity since: ${cutoffDate}\n\n`;

  if (inactiveMembers.length === 0) {
    return false;
  }

  body += `## Inactive Collaborators (${inactiveMembers.length})\n\n`;
  body += `| Login | Inactive Since |\n`;
  body += `| ----- | -------------- |\n`;
  inactiveMembers.forEach(member => {
    body += `| @${member.login} | ${member.inactive_since} |\n`;
  });

  body += `\n## What happens next?\n\n`;
  body += `Team maintainers should review this list and contact inactive collaborators `;
  body += `to confirm their continued interest in participating in the project.`;

  return body;
}

/**
 * Finds all inactive members from a team
 */
async function findInactiveMembers(
  members = [],
  core,
  github,
  repo,
  monthsInactive = DEFAULTS.MONTHS_INACTIVE
) {
  if (!members.length) {
    core.info('No members found to check');
    return [];
  }

  const cutoffDate = getDateMonthsAgo(monthsInactive);
  core.info(`Checking for members inactive since ${cutoffDate}`);
  const inactiveMembers = [];

  // Use concurrency control to avoid rate limiting
  for (const member of members) {
    const { login: username } = member;
    try {
      core.info(`Checking activity for ${username}...`);
      const isActive = await isActiveMember(username, cutoffDate, github, repo);

      if (isActive) {
        core.info(`${username} has recent activity - marked as active`);
      } else {
        core.info(`${username} has no recent activity - marked as inactive`);
        inactiveMembers.push({
          login: username,
          inactive_since: cutoffDate,
        });
      }
    } catch (error) {
      core.warning(`Error checking activity for ${username}: ${error.message}`);
    }
  }

  core.info(
    `Found ${inactiveMembers.length} inactive members out of ${members.length} total`
  );
  return inactiveMembers;
}

/**
 * Finds an existing inactive collaborators issue
 */
async function findInactiveCollaboratorsIssue(github, org, repo) {
  const { data: issues } = await github.rest.issues.listForRepo({
    owner: org,
    repo,
    state: 'open',
    labels: DEFAULTS.ISSUE.LABELS[0],
    per_page: 1,
  });
  return issues.length > 0 ? issues[0] : null;
}

/**
 * Creates or updates the inactive collaborators issue
 */
async function createOrUpdateInactiveCollaboratorsIssue({
  github,
  core,
  org,
  repo,
  inactiveMembers,
  cutoffDate,
}) {
  const issueBody = formatIssueBody(inactiveMembers, cutoffDate);
  if (!issueBody) return;

  const existingIssue = await findInactiveCollaboratorsIssue(github, org, repo);

  if (existingIssue) {
    core.info(
      `Updating existing inactive collaborators issue #${existingIssue.number}`
    );
    await github.rest.issues.update({
      owner: org,
      repo,
      issue_number: existingIssue.number,
      body: issueBody,
    });
    return existingIssue.number;
  }

  core.info('Creating new inactive collaborators issue');
  const { data: newIssue } = await github.rest.issues.create({
    owner: org,
    repo,
    title: DEFAULTS.ISSUE.TITLE,
    body: issueBody,
    labels: DEFAULTS.ISSUE.LABELS,
  });
  return newIssue.number;
}

/**
 * Main function to report inactive collaborators
 */
async function reportInactiveCollaborators(
  core,
  github,
  {
    org = DEFAULTS.ORG,
    teamSlug = DEFAULTS.TEAM_SLUG,
    repo = DEFAULTS.REPO,
    monthsInactive = DEFAULTS.MONTHS_INACTIVE,
  } = {}
) {
  core.info(`Checking inactive collaborators in ${org}/${teamSlug}`);

  const { data: members } = await github.rest.teams.listMembersInOrg({
    org,
    team_slug: teamSlug,
    per_page: 100,
  });

  const fullRepo = `${org}/${repo}`;
  const inactiveMembers = await findInactiveMembers(
    members,
    core,
    github,
    fullRepo,
    monthsInactive
  );

  const cutoffDate = getDateMonthsAgo(monthsInactive);
  const issueNumber = await createOrUpdateInactiveCollaboratorsIssue({
    github,
    core,
    org,
    repo,
    inactiveMembers,
    cutoffDate,
  });

  core.info(
    `Inactive collaborators report available at: https://github.com/${org}/${repo}/issues/${issueNumber}`
  );
  return issueNumber;
}

export {
  reportInactiveCollaborators,
  createOrUpdateInactiveCollaboratorsIssue,
  findInactiveCollaboratorsIssue,
  findInactiveMembers,
  isActiveMember,
  getDateMonthsAgo,
  formatIssueBody,
};
