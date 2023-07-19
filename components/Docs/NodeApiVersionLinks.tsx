import { DOCS_URL } from '@/next.constants.mjs';

// Note.: This is a temporary Component used only until the transition to `nodejs/nodejs.dev` content is done
const NodeApiVersionLinks = () => (
  <ul>
    <li>
      <a href={`${DOCS_URL}latest-v20.x/api/`}>Node.js 20.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v19.x/api/`}>Node.js 19.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v18.x/api/`}>Node.js 18.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v17.x/api/`}>Node.js 17.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v16.x/api/`}>Node.js 16.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v15.x/api/`}>Node.js 15.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v14.x/api/`}>Node.js 14.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v13.x/api/`}>Node.js 13.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v12.x/api/`}>Node.js 12.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v11.x/api/`}>Node.js 11.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v10.x/api/`}>Node.js 10.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v9.x/api/`}>Node.js 9.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v8.x/api/`}>Node.js 8.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v7.x/api/`}>Node.js 7.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v6.x/api/`}>Node.js 6.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v5.x/api/`}>Node.js 5.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v4.x/api/`}>Node.js 4.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v0.12.x/api/`}>Node.js 0.12.x</a>
    </li>
    <li>
      <a href={`${DOCS_URL}latest-v0.10.x/api/`}>Node.js 0.10.x</a>
    </li>
  </ul>
);

export default NodeApiVersionLinks;
