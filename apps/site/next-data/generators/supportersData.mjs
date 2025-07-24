// This is used to ensure that URLs are always in the correct format
function fixUrl(url) {
  if (!url) {
    return null;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
}

async function fetchOpenCollectiveData() {
  const endpoint = 'https://api.opencollective.com/graphql/v2';

  const query = `{
        account(slug: "nodejs") {
          orders(status: ACTIVE, filter: INCOMING) {
            totalCount
            nodes {
              fromAccount {
                name
                website
                imageUrl
              }
              amount {
                value
              }
              tier {
                slug
              }
              frequency
              totalDonations {
                value
              }
            }
          }
        }
        donations: orders(
            account: { slug: "nodejs" }
            frequency: ONETIME
            status: PAID
            filter: INCOMING
          ) {
            totalCount
            nodes {
              id
              updatedAt
              frequency
              status
              amount {
                value
                currency
              }
              fromAccount {
                name
                website
                imageUrl
              }
            }
          }
      }`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const payload = await response.json();

  const sponsors = payload.data.account.orders.nodes.map(order => ({
    name: order.fromAccount.name,
    url: fixUrl(order.fromAccount.website),
    image: order.fromAccount.imageUrl,
    source: 'opencollective',
  }));

  const donations = payload.data.donations.nodes.map(transaction => ({
    name: transaction.fromAccount.name,
    url: fixUrl(transaction.fromAccount.website),
    image: transaction.fromAccount.imageUrl,
    source: 'opencollective',
  }));

  sponsors.push(...donations);

  return sponsors;
}

// TODO: implement github sponsors data fetching
// TODO: implement ramdomizing of supporters

export { fetchOpenCollectiveData };
