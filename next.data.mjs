import { generateBlogYearPages } from './scripts/next-data/generatePreBuildFiles.mjs';
import getLocalisationData from './scripts/next-data/getLocalisationData.mjs';
import getNodeVersionData from './scripts/next-data/getNodeVersionData.mjs';
import getBlogData from './scripts/next-data/getBlogData.mjs';

const cachedNodeVersionData = getNodeVersionData();
const cachedLocalisationData = getLocalisationData();
const cachedBlogData = getBlogData();

// generates pre-build files for blog year pages (pagination)
generateBlogYearPages(cachedBlogData);

const getNextData = async (content, { route }) => {
  const localisationData = await cachedLocalisationData(route);
  const nodeVersionData = await cachedNodeVersionData(route);
  const blogData = await cachedBlogData(route);

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      const i18nData = ${JSON.stringify(localisationData)};
      const nodeVersionData = ${JSON.stringify(nodeVersionData)};
      const blogData = ${JSON.stringify(blogData)};

      return { props: { i18nData, nodeVersionData, blogData } };
    }
  `;
};

export default getNextData;
