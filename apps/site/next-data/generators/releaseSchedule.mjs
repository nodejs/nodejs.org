import { RELEASE_SCHEDULE_URL } from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/util/fetch';

async function fetchReleaseSchedule() {
  const response = await fetchWithRetry(RELEASE_SCHEDULE_URL);

  return response.json();
}

export default fetchReleaseSchedule;
