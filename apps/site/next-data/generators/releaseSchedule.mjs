import { RELEASE_SCHEDULE_URL } from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/next.fetch.mjs';

async function fetchReleaseSchedule() {
  const response = await fetchWithRetry(RELEASE_SCHEDULE_URL);

  return response.json();
}

export default fetchReleaseSchedule;
