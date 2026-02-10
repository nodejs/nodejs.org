import { OPENCOLLECTIVE_MEMBERS_URL } from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/next.fetch.mjs';

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
    .map(({ name, website, image, profile }) => ({
      name,
      image,
      url: website,
      profile,
      source: 'opencollective',
    }));

  return members;
}

export default fetchOpenCollectiveData;
