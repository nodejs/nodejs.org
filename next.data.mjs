import * as preBuild from './scripts/next-data/generatePreBuildFiles.mjs';

import getBlogData from './scripts/next-data/getBlogData.mjs';
import generateNodeReleasesJson from './scripts/next-data/generateNodeReleasesJson.mjs';

const cachedBlogData = getBlogData();

generateNodeReleasesJson();

// generates pre-build files for blog year pages (pagination)
preBuild.generateBlogYearPages(cachedBlogData);
preBuild.generateWebsiteFeeds(cachedBlogData);

const getNextData = async (content, { route }) => {
  const blogData = await cachedBlogData(route);

  const props = { ...blogData };

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      return { props: ${JSON.stringify(props)} };
    }
  `;
};

export default getNextData;
