import { createReadStream } from 'node:fs';
import { basename, extname, join } from 'node:path';
import readline from 'node:readline';

import graymatter from 'gray-matter';

import { getMarkdownFiles } from '@/next.helpers.mjs';
import type { BlogData } from '@/types';

const blogPath = join(process.cwd(), 'pages/en/blog');

const blogCategories = new Set(['all']);

const getFrontMatter = (filename: string, source: string) => {
  const {
    title = 'Untitled',
    author = 'The Node.js Project',
    username,
    date = new Date(),
    category = 'uncategorized',
  } = graymatter(source).data;

  const publishYear = new Date(date).getUTCFullYear();

  const categories = [category, `year-${publishYear}`, 'all'];

  blogCategories.add(`year-${publishYear}`);
  blogCategories.add(category);

  const slug = `/blog/${category}/${basename(filename, extname(filename))}`;

  return { title, author, username, date: new Date(date), categories, slug };
};

const generateBlogData = async (): Promise<BlogData> => {
  const filenames = await getMarkdownFiles(process.cwd(), 'pages/en/blog', [
    '**/index.md',
  ]);

  return new Promise(resolve => {
    const posts = [] as BlogData['posts'];
    const rawFrontmatter = new Map<string, [number, string]>();

    filenames.forEach((filename: string) => {
      const _stream = createReadStream(join(blogPath, filename));
      const _readLine = readline.createInterface({ input: _stream });

      rawFrontmatter.set(filename, [0, '']);

      _readLine.on('line', line => {
        const [count, content] = rawFrontmatter.get(filename)!;
        rawFrontmatter.set(filename, [count + (line === '---' ? 1 : 0), content + line + '\n']);

        if (rawFrontmatter.get(filename)![0] === 2) {
          _readLine.close();
          _stream.close();
        }
      });

      _readLine.on('close', () => {
        posts.push(getFrontMatter(filename, rawFrontmatter.get(filename)![1]));

        if (posts.length === filenames.length) {
          resolve({ categories: [...blogCategories], posts });
        }
      });
    });
  });
};

export default generateBlogData;
