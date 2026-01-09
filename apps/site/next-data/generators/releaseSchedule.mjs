import { RELEASE_SCHEDULE_URL } from '#site/next.constants.mjs';
import { fetchWithRetry } from '#site/util/fetch';

async function fetchReleaseSchedule() {
  const response = await fetchWithRetry(RELEASE_SCHEDULE_URL);

  const payload = await response.json();

  return payload;
}

export default fetchReleaseSchedule;
