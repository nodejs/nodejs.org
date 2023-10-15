import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import CodeBox from './index';

type Story = StoryObj<typeof CodeBox>;
type Meta = MetaObj<typeof CodeBox>;

export const Default: Story = {
  args: {
    codeSnippets: [
      {
        code: `// This function gets called at build time on server-side.
        export async function getStaticProps() {
          const res = await fetch('https://.../posts')
          const posts = await res.json()

          return {
            props: {
              posts
            }
          }
        }

        export default Blog`,
        title: 'Example',
        language: 'JavaScript',
        lang: 'js',
      },
    ],
  },
};

export const MultipleCodes: Story = {
  args: {
    codeSnippets: [
      {
        code: `// This function gets called at build time on server-side.
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts
    }
  }
}

export default Blog`,
        title: 'Example',
        language: 'JavaScript',
        lang: 'js',
      },
      {
        code: `interface User {
          id: number
          firstName: string
          lastName: string
          role: string
        }

        function updateUser(id: number, update: Partial<User>) {
          const user = getUser(id)
          const newUser = { ...user, ...update }
          saveUser(id, newUser)
        }`,
        title: 'Example 2',
        language: 'TypeScript',
        lang: 'ts',
      },
    ],
  },
};

export const WithLink: Story = {
  args: {
    codeSnippets: [
      {
        code: `// This function gets called at build time on server-side.
        export async function getStaticProps() {
          const res = await fetch('https://.../posts')
          const posts = await res.json()

          return {
            props: {
              posts
            }
          }
        }

        export default Blog`,
        title: 'Example',
        language: 'JavaScript',
        lang: 'js',
      },
      {
        code: `interface User {
          id: number
          firstName: string
          lastName: string
          role: string
        }

        function updateUser(id: number, update: Partial<User>) {
          const user = getUser(id)
          const newUser = { ...user, ...update }
          saveUser(id, newUser)
        }`,
        title: 'Example 2',
        language: 'TypeScript',
        lang: 'ts',
      },
    ],
    link: {
      text: 'More Options',
      url: 'https://google.com',
    },
  },
};

export default { component: CodeBox } as Meta;
