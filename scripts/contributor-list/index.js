'use strict'

const path = require('path')

const GithubGraphQLApi = require('node-github-graphql')
const github = new GithubGraphQLApi({
  Promise,
  token: process.env.GITHUB_API_TOKEN,
  userAgent: 'nodejs.org-contributor'
})

const args = process.argv.splice(2)
const since = args[0]

if (!/\d{4}-\d{2}-\d{2}/.test(since)) {
  console.error(`usage: ${path.basename(process.argv[1])} YYYY-MM-DD`)
  process.exit(1)
}

const authors = github.query(`
  query ($org: String!, $repo: String!, $since: GitTimestamp!) {
    repository(name: $repo, owner: $org) {
      ref(qualifiedName: "master") {
        target {
          ... on Commit {
            history(first: 100, since: $since) {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  oid
                  author {
                    name
                    user {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`, {
    'org': 'nodejs',
    'repo': 'nodejs.org',
    'since': since
  })
  .then(res => {
    const commits = res.data.repository.ref.target.history.edges

    const parsed = new Map()
    commits.forEach(commit => {
      const name = commit.node.author.name
      const username = commit.node.author.user.login
      const committer = parsed.get(username)
      const commitCount = committer ? committer.commits : 0

      parsed.set(username, {
        name,
        commits: commitCount + 1
      })
    })

    return parsed.entries()
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
