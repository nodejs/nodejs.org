import { readFile } from 'node:fs/promises';

const CONFIG = {
  GOVERNANCE_FILE: 'GOVERNANCE.md',
  CURRENT_MEMBERS_HEADER: '#### Current Members',
  INACTIVE_MONTHS: 12,
  ISSUE_TITLE: 'Inactive Collaborator Report',
  ISSUE_LABELS: ['meta', 'inactive-collaborator-report'],
};

// Get date N months ago in YYYY-MM-DD format
const getDateMonthsAgo = (months = CONFIG.INACTIVE_MONTHS) => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
};

// Check if there's already an open issue
async function hasOpenIssue(github, context) {
  const { owner, repo } = context.repo;
  const { data: issues } = await github.rest.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    labels: CONFIG.ISSUE_LABELS[1],
    per_page: 1,
  });

  return issues.length > 0;
}

// Parse collaborator usernames from governance file
async function parseCollaborators() {
  const content = await readFile(CONFIG.GOVERNANCE_FILE, 'utf8');
  const lines = content.split('\n');
  const collaborators = [];

  const startIndex =
    lines.findIndex(l => l.startsWith(CONFIG.CURRENT_MEMBERS_HEADER)) + 1;
  if (startIndex <= 0) return collaborators;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#')) break;

    const match = line.match(/^\s*-\s*\[([^\]]+)\]/);
    if (match) collaborators.push(match[1]);
  }

  return collaborators;
}

// Check if users have been active since cutoff date
async function getInactiveUsers(github, usernames, repo, cutoffDate) {
  const inactiveUsers = [];

  for (const username of usernames) {
    // Check commits
    const { data: commits } = await github.rest.search.commits({
      q: `author:${username} repo:${repo} committer-date:>=${cutoffDate}`,
      per_page: 1,
    });

    // Check issues and PRs
    const { data: issues } = await github.rest.search.issuesAndPullRequests({
      q: `involves:${username} repo:${repo} updated:>=${cutoffDate}`,
      per_page: 1,
    });

    // User is inactive if they have no commits AND no issues/PRs
    if (commits.total_count === 0 && issues.total_count === 0) {
      inactiveUsers.push(username);
    }
  }

  return inactiveUsers;
}

// Generate report for inactive members
function formatReport(inactiveMembers, cutoffDate) {
  if (!inactiveMembers.length) return null;

  const today = getDateMonthsAgo(0);
  return `# Inactive Collaborators Report

Last updated: ${today}
Checking for inactivity since: ${cutoffDate}

## Inactive Collaborators (${inactiveMembers.length})

| Login |
| ----- |
${inactiveMembers.map(m => `| @${m} |`).join('\n')}

## What happens next?

@nodejs/nodejs-website should review this list and contact inactive collaborators to confirm their continued interest in participating in the project.`;
}

async function createIssue(github, context, report) {
  if (!report) return;

  const { owner, repo } = context.repo;
  await github.rest.issues.create({
    owner,
    repo,
    title: CONFIG.ISSUE_TITLE,
    body: report,
    labels: CONFIG.ISSUE_LABELS,
  });
}

export default async function (github, context) {
  // Check for existing open issue first - exit early if one exists
  if (await hasOpenIssue(github, context)) {
    return;
  }

  const cutoffDate = getDateMonthsAgo();
  const collaborators = await parseCollaborators();

  const inactiveMembers = await getInactiveUsers(
    github,
    collaborators,
    `${context.repo.owner}/${context.repo.repo}`,
    cutoffDate
  );
  const report = formatReport(inactiveMembers, cutoffDate);

  await createIssue(github, context, report);
}
