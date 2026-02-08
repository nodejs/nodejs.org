import {
  OPENCOLLECTIVE_MEMBERS_URL,
  GITHUB_GRAPHQL_URL,
  GITHUB_API_KEY,
} from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/util/fetch';

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
      url: profile,
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
  if (!GITHUB_API_KEY) {
    return [];
  }

  const sponsors = [];

  // Fetch sponsorship pages
  let cursor = null;

  while (true) {
    const query = sponsorshipsQuery(cursor);
    const data = await graphql(query);

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
        id: s?.id || null,
        login: s?.login || null,
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

  const query = donationsQuery();
  const data = await graphql(query);

  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }

  const nodeRes = data.data.organization?.sponsorsActivities;

  const { nodes } = nodeRes;
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

  return sponsors;
}

function sponsorshipsQuery(cursor = null) {
  return `
    query {
        organization(login: "nodejs") {
            sponsorshipsAsMaintainer (first: 100, includePrivate: false, after: "${cursor}") {
                nodes {
                    sponsor: sponsorEntity {
                        ...on User {
                            id: databaseId,
                            name,
                            login,
                            avatarUrl,
                            url,
                            websiteUrl
                        }
                        ...on Organization {
                            id: databaseId,
                            name,
                            login,
                            avatarUrl,
                            url,
                            websiteUrl
                        }
                    },
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }`;
}

function donationsQuery() {
  return `
       query {
            organization(login: "nodejs") {
                sponsorsActivities (first: 100, includePrivate: false) {
                    nodes {
                        id
                        sponsor {
                            ...on User {
                                id: databaseId,
                                name,
                                login,
                                avatarUrl,
                                url,
                                websiteUrl
                            }
                            ...on Organization {
                                id: databaseId,
                                name,
                                login,
                                avatarUrl,
                                url,
                                websiteUrl
                            }
                        },
                        timestamp
                        tier: sponsorsTier {
                            monthlyPriceInDollars,
                            isOneTime
                        }
                    }
                }
            }
        }`;
}

const graphql = async (query, variables = {}) => {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_API_KEY}`,
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
  const sponsors = await Promise.all([
    fetchGithubSponsorsData(),
    fetchOpenCollectiveData(),
  ]);

  return sponsors.flat();
}

export default sponsorsData;
