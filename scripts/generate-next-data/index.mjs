'use strict';

import * as nextData from '../../next.data.mjs';

// generate the node.js releases json file
await nextData.generateNodeReleasesJson();

// generate the data from blog posts
await nextData.generateBlogPostsData();
