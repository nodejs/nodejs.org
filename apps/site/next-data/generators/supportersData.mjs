import { OPENCOLLECTIVE_MEMBERS_URL } from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/util/fetch';

/**
 * Fetches supporters data from Open Collective API, filters active backers,
 * and maps it to the Supporters type.
 *
 * @returns {Promise<Array<import('#site/types/supporters').OpenCollectiveSupporter>>} Array of supporters
 */
export default () =>
  fetchWithRetry(OPENCOLLECTIVE_MEMBERS_URL)
    .then(response => response.json())
    .then(payload =>
      payload
        .filter(({ role, isActive }) => role === 'BACKER' && isActive)
        .sort((a, b) => b.totalAmountDonated - a.totalAmountDonated)
        .map(({ name, website, image, profile }) => ({
          name,
          image,
          url: website,
          profile,
          source: 'opencollective',
        }))
    );
