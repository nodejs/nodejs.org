import * as preBuild from './scripts/next-data/generatePreBuildFiles.mjs';

import getLocalisationData from './scripts/next-data/getLocalisationData.mjs';
import getBlogData from './scripts/next-data/getBlogData.mjs';
import generateNodeReleasesData from './scripts/next-data/generateNodeReleasesData.mjs';

const cachedBlogData = getBlogData();

generateNodeReleasesData();

// generates pre-build files for blog year pages (pagination)
preBuild.generateBlogYearPages(cachedBlogData);
preBuild.generateWebsiteFeeds(cachedBlogData);

const cachedLocalisationData = getLocalisationData();

const getNextData = async (content, { route }) => {
  const localisationData = await cachedLocalisationData(route);
  const blogData = await cachedBlogData(route);

  const props = { ...localisationData, ...blogData };

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      return { props: ${JSON.stringify(props)} };
    }
  `;
};

export default getNextData;
