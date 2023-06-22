import * as nextData from './scripts/next-data/index.mjs';

const cachedBlogData = nextData.getBlogData();

nextData.generateNodeReleasesJson();

// generates pre-build files for blog year pages (pagination)
nextData.generateBlogYearPages(cachedBlogData);
nextData.generateWebsiteFeeds(cachedBlogData);

const getNextData = async (content, { route }) => {
  const blogData = await cachedBlogData(route);

  const staticProps = { ...blogData };

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      return { props: ${JSON.stringify(staticProps)} };
    }
  `;
};

export default getNextData;
