import { readFile, readdir } from 'fs/promises';
import { basename, extname, join } from 'path';
import graymatter from 'gray-matter';

import {
  getDirectories,
  getMatchingRoutes,
  getRelativePath,
} from './_helpers.mjs';

// this allows us to get the current module working directory
const __dirname = getRelativePath(import.meta.url);

// gets the current blog path based on local module path
const blogPath = join(__dirname, '../../pages/en/blog');

// gathers only the frontmatter fields that are relevant to us
const getMatter = name => content => {
  const { title, author, date, category } = graymatter(content).data;

  // we only want the actual name of the file without the extension
  // and then prepend the category name to it
  const slug = `/blog/${category}/${basename(name, extname(name))}`;

  return { title, author, date, category, slug, file: basename(name) };
};

const getPost = category => post =>
  readFile(join(blogPath, category, post)).then(getMatter(post));

const getPosts = (category, posts) =>
  posts.then(posts => Promise.all(posts.map(getPost(category))));

const currentYear = new Date().getFullYear();

// Note.: This current structure is coupled to the current way how we do pagination and categories
// This will definitely change over time once we start migrating to the `nodejs/nodejs.dev` codebase
const getBlogData = () => {
  const blogCategories = getDirectories(blogPath).then(c =>
    c.map(s => [s, readdir(join(blogPath, s))])
  );

  const categoriesPosts = blogCategories.then(c =>
    c.map(([s, f]) => [s, getPosts(s, f)])
  );

  return (route = '/', getAllAvailablePosts = false) => {
    const [, , subDirectory, category = `year-${currentYear}`, blogPostSlug] =
      route.split('/');

    const generatedBlogData = (posts, hasNext, hasPrev) => ({
      blogData: {
        posts: posts.sort((a, b) => b.date - a.date),
        currentCategory: category,
        pagination: { next: hasNext || null, prev: hasPrev || null },
      },
    });

    // we don't want to generate blog data within a blog post
    if (blogPostSlug && blogPostSlug.length > 0) {
      return {};
    }

    if (getMatchingRoutes(subDirectory, ['blog'])) {
      return categoriesPosts.then(categories => {
        // yearly pagination posts (doesn't accept category pagination)
        if (category && category.startsWith('year-')) {
          const selectedYear = Number(category.replace('year-', ''));

          // get only the post ingredient from the category array
          const allPosts = categories.map(([, f]) => f);

          const generatedBlog = posts =>
            generatedBlogData(
              posts.filter(p => p.date.getFullYear() === selectedYear),
              posts.some(p => p.date.getFullYear() === selectedYear + 1) &&
                `/blog/year-${selectedYear + 1}`,
              posts.some(p => p.date.getFullYear() === selectedYear - 1) &&
                `/blog/year-${selectedYear - 1}`
            );

          return Promise.all(allPosts)
            .then(s => Promise.all(s.flat()))
            .then(s => s.filter(p => p.date && p.file !== 'index.md'))
            .then(generatedBlog);
        }

        // attempts to find a category that matches the current route category
        const currentCategory = categories.find(([c]) => c === category);

        if (category && currentCategory) {
          // extract the posts part of the current category
          const [, categoryPosts] = currentCategory;

          const generatedBlog = posts => generatedBlogData(posts);

          // get all posts from current category instead of traversing all categories
          return categoryPosts
            .then(posts => posts.flat())
            .then(posts => posts.filter(p => p.file !== 'index.md'))
            .then(generatedBlog);
        }

        // this should not happen or means the category is non-existent
        return {};
      });
    }

    if (getAllAvailablePosts) {
      return categoriesPosts.then(categories => {
        // get only the post ingredient from the category array
        const allPosts = categories.map(([, f]) => f);

        const generatedBlog = posts => generatedBlogData(posts);

        return Promise.all(allPosts)
          .then(s => Promise.all(s.flat()))
          .then(s => s.filter(p => p.date && p.file !== 'index.md'))
          .then(generatedBlog);
      });
    }

    return {};
  };
};

export default getBlogData;
