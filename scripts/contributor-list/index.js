'use strict'

const path = require('path')

const _ = require('lodash')
const GithubGraphQLApi = require('node-github-graphql')

const args = process.argv.splice(2)
const since = new Date(args[0])

if (Number.isNaN(since.getTime())) {
  console.error(`usage: ${path.basename(process.argv[1])} YYYY-MM-DD`)
  process.exit(1)
}

const github = new GithubGraphQLApi({
  Promise,
  token: process.env.GITHUB_API_TOKEN,
  userAgent: 'nodejs.org-contributor'
})

const queryCommits = variables => github.query(`
  query ($repositoryOwner: String!, $repositoryName: String!, $since: GitTimestamp, $historyAfter: String) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
            history(first: 100, since: $since, after: $historyAfter) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                author {
                  user {
                    name
                    login
                  }
                }
              }
            }
          }
        }
      }
    }
  }`, variables)
  .then(res => {
    const data = _.get(res, ['data', 'repository', 'ref', 'target', 'history'])
    if (_.isEmpty(data)) {
      return []
    }

    const commits = data.nodes

    const page = data.pageInfo
    if (page.hasNextPage === false) {
      return commits
    }

    const historyAfter = page.endCursor
    return queryCommits(_.defaults({ historyAfter }, variables))
      .then(others => _.concat(commits, others))
  })

const queryCollaborators = variables => github.query(`
  query ($repositoryOwner: String!, $repositoryName: String!, $collaboratorsAfter: String) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      collaborators(first: 100, after: $collaboratorsAfter) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          login
        }
      }
    }
  }`, variables)
  .then(res => {
    const data = _.get(res, ['data', 'repository', 'collaborators'])
    if (_.isEmpty(data)) {
      return []
    }

    const collaborators = data.nodes

    const page = data.pageInfo
    if (page.hasNextPage === false) {
      return collaborators
    }

    const collaboratorsAfter = page.endCursor
    return queryCollaborators(_.defaults({ collaboratorsAfter }, variables))
      .then(others => _.concat(collaborators, others))
  })

const repositoryOwner = 'nodejs'
const repositoryName = 'nodejs.org'

const formatOutput = (users) => {
  console.log(`${repositoryOwner}/${repositoryName} committers since ${args[0]}, which aren't contributors yet:\n`)
  console.log(users.map(user => {
    const name = user.name ? `(${user.name})` : ''
    return `* ${user.login} ${name}`
  }).join('\n'))
}

Promise
  .all([
    queryCollaborators({ repositoryOwner, repositoryName }),
    queryCommits({ repositoryOwner, repositoryName, since })
  ])
  .then(results => {
    const collaborators = _.keyBy(results[0], 'login')

    return _.chain(results[1])
      .map('author.user')
      .reject(_.isEmpty)
      .groupBy('login')
      .map(group => _.defaults({ commits: _.size(group) }, _.head(group)))
      .filter(user => _.isEmpty(collaborators[user.login]))
      .value()
  })
  .then(res => formatOutput(res))
  .catch(err => console.log(err))
