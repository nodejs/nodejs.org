'use strict';

const textToDisplay =
  '(blog-posts-data.json) and (node-releases-data.json) got generated.';

console.log(`- \x1b[0;34minfo\x1b[0m \x1b[1m${textToDisplay}\x1b[0m`);

import * as nextData from '../../next.data.mjs';

// generate the node.js releases json file
await nextData.generateNodeReleasesJson();

// generate the data from blog posts
await nextData.generateBlogPostsData();
