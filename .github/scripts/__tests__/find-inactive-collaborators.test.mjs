import assert from 'node:assert/strict';
import { beforeEach, describe, it, mock } from 'node:test';

import {
  findInactiveMembers,
  isActiveMember,
  getDateMonthsAgo,
  reportInactiveCollaborators,
  createOrUpdateInactiveCollaboratorsIssue,
  findInactiveCollaboratorsIssue,
  formatIssueBody,
} from '../find-inactive-collaborators.mjs';

// Test constants
const MOCK_DATE = new Date('2025-05-23T14:33:31Z');
const CUTOFF_DATE = '2024-05-23';
const TEST_MEMBERS = [
  { login: 'active-user' },
  { login: 'inactive-user' },
  { login: 'active-user-issues' },
];

describe('Inactive Collaborators Tests', () => {
  let core, github;

  mock.timers.enable({ apis: ['Date'], now: MOCK_DATE });

  beforeEach(() => {
    // Simplified mocks
    const logs = [],
      warnings = [];
    core = {
      info: msg => logs.push(msg),
      warning: msg => warnings.push(msg),
      getLogs: () => [...logs],
      getWarnings: () => [...warnings],
      clearLogs: () => {
        logs.length = 0;
      },
    };

    github = {
      rest: {
        search: {
          commits: async ({ q }) => ({
            data: {
              total_count: q.includes('author:active-user') ? 5 : 0,
              items: q.includes('author:active-user')
                ? [{ sha: 'abc123' }]
                : [],
            },
          }),
          issuesAndPullRequests: async ({ q }) => ({
            data: {
              total_count: q.includes('involves:active-user-issues') ? 3 : 0,
              items: q.includes('involves:active-user-issues')
                ? [{ number: 123 }]
                : [],
            },
          }),
        },
        teams: {
          listMembersInOrg: async () => ({ data: TEST_MEMBERS }),
        },
        issues: {
          listForRepo: async ({ repo }) => ({
            data:
              repo === 'repo-with-issue'
                ? [
                    {
                      number: 42,
                      title: 'Inactive Collaborators Report',
                      body: 'Previous report',
                    },
                  ]
                : [],
          }),
          create: async ({ title, body }) => ({
            data: { number: 99, title, body },
          }),
          update: async ({ issue_number, body }) => ({
            data: { number: issue_number, body },
          }),
        },
      },
    };
  });

  describe('Utilities and core functionality', () => {
    it('correctly formats dates with different month offsets', () => {
      assert.equal(getDateMonthsAgo(12), CUTOFF_DATE);
      assert.equal(getDateMonthsAgo(0), '2025-05-23');
      assert.equal(getDateMonthsAgo(6), '2024-11-23');
    });

    it('correctly identifies active and inactive users', async () => {
      assert.equal(
        await isActiveMember('active-user', CUTOFF_DATE, github),
        true
      );
      assert.equal(
        await isActiveMember('active-user-issues', CUTOFF_DATE, github),
        true
      );
      assert.equal(
        await isActiveMember('inactive-user', CUTOFF_DATE, github),
        false
      );
    });

    it('finds inactive members from the team list', async () => {
      const inactiveMembers = await findInactiveMembers(
        TEST_MEMBERS,
        core,
        github
      );

      assert.partialDeepStrictEqual(inactiveMembers, [
        { login: 'inactive-user' },
      ]);
    });
  });

  describe('Issue management', () => {
    it('formats issue body correctly', () => {
      const inactiveMembers = [
        {
          login: 'inactive-user',
          inactive_since: CUTOFF_DATE,
        },
      ];

      const body = formatIssueBody(inactiveMembers, CUTOFF_DATE);

      assert.ok(body.includes('# Inactive Collaborators Report'));
      assert.ok(body.includes('## Inactive Collaborators (1)'));
      assert.ok(body.includes('@inactive-user'));
    });

    it('handles empty inactive members list', () => {
      assert.ok(!formatIssueBody([], CUTOFF_DATE));
    });

    it('manages issue creation and updates', async () => {
      const inactiveMembers = [
        { login: 'inactive-user', inactive_since: CUTOFF_DATE },
      ];

      // Test finding issues
      const existingIssue = await findInactiveCollaboratorsIssue(
        github,
        'nodejs',
        'repo-with-issue'
      );
      const nonExistingIssue = await findInactiveCollaboratorsIssue(
        github,
        'nodejs',
        'repo-without-issue'
      );

      assert.equal(existingIssue.number, 42);
      assert.equal(nonExistingIssue, null);

      // Test updating existing issues
      const updatedIssueNum = await createOrUpdateInactiveCollaboratorsIssue({
        github,
        core,
        org: 'nodejs',
        repo: 'repo-with-issue',
        inactiveMembers,
        cutoffDate: CUTOFF_DATE,
      });
      assert.equal(updatedIssueNum, 42);

      // Test creating new issues
      const newIssueNum = await createOrUpdateInactiveCollaboratorsIssue({
        github,
        core,
        org: 'nodejs',
        repo: 'repo-without-issue',
        inactiveMembers,
        cutoffDate: CUTOFF_DATE,
      });
      assert.equal(newIssueNum, 99);
    });
  });

  describe('Complete workflow', () => {
    it('correctly executes the full report generation workflow', async () => {
      await reportInactiveCollaborators(core, github, {
        org: 'nodejs',
        teamSlug: 'team',
        repo: 'repo',
        monthsInactive: 12,
      });

      const logs = core.getLogs();
      assert.ok(
        logs.some(log => log.includes('Checking inactive collaborators'))
      );
      assert.ok(
        logs.some(log =>
          log.includes('Inactive collaborators report available at:')
        )
      );
    });

    it('uses default parameters when not specified', async () => {
      const customGithub = {
        ...github,
        rest: {
          ...github.rest,
          teams: {
            listMembersInOrg: async ({ org, team_slug }) => {
              assert.equal(org, 'nodejs');
              assert.equal(team_slug, 'nodejs-website');
              return { data: [] };
            },
          },
        },
      };

      await reportInactiveCollaborators(core, customGithub);
    });
  });
});
