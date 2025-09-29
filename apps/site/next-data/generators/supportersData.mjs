async function fetchOpenCollectiveData() {
  const endpoint = 'https://opencollective.com/nodejs/members/all.json';

  const response = await fetch(endpoint, { method: 'GET' });

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

// TODO: implement github sponsors data fetching
// TODO: implement ramdomizing of supporters

export { fetchOpenCollectiveData };
