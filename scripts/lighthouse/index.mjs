const stoplight = res => (res >= 90 ? '🟢' : res >= 75 ? '🟠' : '🔴');
const normalizeScore = res => Math.round(res * 100);
const formatScore = res => {
  const normalizedScore = normalizeScore(res);
  return `${stoplight(normalizedScore)} ${normalizedScore}`;
};

export const format = ({ core }) => {
  // this will be the shape of https://github.com/treosh/lighthouse-ci-action#manifest
  const results = JSON.parse(process.env.LIGHTHOUSE_RESULT);

  const formattedResults = results
    .map(({ url, summary }) => {
      return `Lighthouse results for ${url}
Category | Score
--- | ---
Performance | ${formatScore(summary.performance)}
Accessibility | ${formatScore(summary.accessibility)}
Best practices | ${formatScore(summary['best-practices'])}
SEO | ${formatScore(summary.seo)}
`;
    })
    .join('\n\n');

  core.setOutput('comment', formattedResults);
};
