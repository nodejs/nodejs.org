/**
 * Fetches supporters data from Open Collective API, filters active backers,
 * and maps it to the Supporters type.
 *
 * @returns {Promise<Array<import('#site/types/supporters')>>} Array of supporters
 */
async function fetchOpenCollectiveData() {
  const endpoint = 'https://opencollective.com/nodejs/members/all.json';

  const response = await fetch(endpoint);

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
