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
    .map(({ name, website, image }) => ({
      name,
      image,
      url: website,
      source: 'opencollective',
    }));

  return members;
}

export { fetchOpenCollectiveData };
