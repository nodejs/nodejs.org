import {
  OPENCOLLECTIVE_MEMBERS_URL,
  GITHUB_GRAPHQL_URL,
  GITHUB_READ_API_KEY,
} from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/next.fetch.mjs';
import { shuffle } from '#site/util/array';

const SPONSORSHIPS_QUERY = `
  query ($cursor: String) {
    organization(login: "nodejs") {
      sponsorshipsAsMaintainer(
        first: 100
        includePrivate: false
        after: $cursor
        activeOnly: false
      ) {
        nodes {
          sponsor: sponsorEntity {
            ...on User {
              id: databaseId
              name
              login
              avatarUrl
              url
              websiteUrl
            }
            ...on Organization {
              id: databaseId
              name
              login
              avatarUrl
              url
              websiteUrl
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

const DONATIONS_QUERY = `
  query {
    organization(login: "nodejs") {
      sponsorsActivities(first: 100, includePrivate: false) {
        nodes {
          id
          sponsor {
            ...on User {
              id: databaseId
              name
              login
              avatarUrl
              url
              websiteUrl
            }
            ...on Organization {
              id: databaseId
              name
              login
              avatarUrl
              url
              websiteUrl
            }
          }
          timestamp
          tier: sponsorsTier {
            monthlyPriceInDollars
            isOneTime
          }
        }
      }
    }
  }
`;

/**
 * Fetches supporters data from Open Collective API, filters active backers,
 * and maps it to the Supporters type.
 *
 * @returns {Promise<Array<import('#site/types/supporters').OpenCollectiveSupporter>>} Array of supporters
 */
async function fetchOpenCollectiveData() {
  const response = await fetchWithRetry(OPENCOLLECTIVE_MEMBERS_URL);

  const payload = await response.json();

  const members = payload
    .filter(({ role, isActive }) => role === 'BACKER' && isActive)
    .sort((a, b) => b.totalAmountDonated - a.totalAmountDonated)
    .map(({ name, image, profile }) => ({
      name,
      image,
      // If profile starts with the guest- prefix, it's a non-existing account
      url: profile.startsWith('https://opencollective.com/guest-')
        ? undefined
        : profile,
      source: 'opencollective',
    }));

  return members;
}

/**
 * Fetches supporters data from Github API, filters active backers,
 * and maps it to the Supporters type.
 *
 * @returns {Promise<Array<import('#site/types/supporters').GithubSponsorSupporter>>} Array of supporters
 */
async function fetchGithubSponsorsData() {
  if (!GITHUB_READ_API_KEY) {
    return [];
  }

  const [sponsorships, donations] = await Promise.all([
    fetchSponsorshipsQuery(),
    fetchDonationsQuery(),
  ]);

  return [...sponsorships, ...donations];
}

async function fetchSponsorshipsQuery() {
  const sponsors = [];
  let cursor = null;

  while (true) {
    const data = await graphql(SPONSORSHIPS_QUERY, { cursor });

    if (data.errors) {
      throw new Error(JSON.stringify(data.errors));
    }

    const nodeRes = data.data.organization?.sponsorshipsAsMaintainer;
    if (!nodeRes) {
      break;
    }

    const { nodes, pageInfo } = nodeRes;
    const mapped = nodes.map(n => {
      const s = n.sponsor || n.sponsorEntity || n.sponsorEntity; // support different field names
      return {
        name: s?.name || s?.login || null,
        image: s?.avatarUrl || null,
        url: s?.url || null,
        source: 'github',
      };
    });

    sponsors.push(...mapped);

    if (!pageInfo.hasNextPage) {
      break;
    }

    cursor = pageInfo.endCursor;
  }

  return sponsors;
}

async function fetchDonationsQuery() {
  const data = await graphql(DONATIONS_QUERY);

  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }

  const nodeRes = data.data.organization?.sponsorsActivities;
  if (!nodeRes) {
    return [];
  }

  const { nodes } = nodeRes;
  return nodes.map(n => {
    const s = n.sponsor || n.sponsorEntity || n.sponsorEntity; // support different field names
    return {
      name: s?.name || s?.login || null,
      image: s?.avatarUrl || null,
      url: s?.url || null,
      source: 'github',
    };
  });
}

const graphql = async (query, variables = {}) => {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_READ_API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${text}`);
  }

  return res.json();
};

/**
 * Fetches supporters data from Open Collective API and GitHub Sponsors, filters active backers,
 * and maps it to the Supporters type.
 *
 * @returns {Promise<Array<import('#site/types/supporters').OpenCollectiveSupporter | import('#site/types/supporters').GithubSponsorSupporter>>} Array of supporters
 */
async function sponsorsData() {
  const seconds = 300; // Change every 5 minutes
  const seed = Math.floor(Date.now() / (seconds * 1000));

  const sponsors = await Promise.all([
    fetchGithubSponsorsData(),
    fetchOpenCollectiveData(),
  ]);

  const shuffled = await shuffle(sponsors.flat(), seed);

  return shuffled;
}

export default sponsorsData;
