import * as nextData from './next-data/index.mjs';

// gather blog data and caches it
const cachedBlogData = nextData.getBlogData();

// generate the node.js releases json file
nextData.generateNodeReleasesJson();

// generate the website RSS feeds XML files
nextData.generateWebsiteFeeds(cachedBlogData);

const getNextData = async (content, { route }) => {
  // retrieves a per-route set of blog data
  // which should only include blog-related routes
  const blogData = await cachedBlogData(route);

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      return { props: ${JSON.stringify({ ...blogData })} };
    }
  `;
};

export default getNextData;
