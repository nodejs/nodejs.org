const stoplight = res => (res >= 90 ? '🟢' : res >= 75 ? '🟠' : '🔴');
const normalizeScore = res => Math.round(res * 100);
const formatScore = res => {
  const normalizedScore = normalizeScore(res);
  return `${stoplight(normalizedScore)} ${normalizedScore}`;
};

/**
 * core is in scope from https://github.com/actions/github-script
 * This is a CJS formatted file because using ESM here requires setting `type: module` in the package.json and that broke out site capabilities
 */
module.exports = ({ core }) => {
  // this will be the shape of https://github.com/treosh/lighthouse-ci-action#manifest
  const results = JSON.parse(process.env.LIGHTHOUSE_RESULT);

  // this will be the shape of https://github.com/treosh/lighthouse-ci-action#links
  const links = JSON.parse(process.env.LIGHTHOUSE_LINKS);

  // start creating our markdown table
  const header = [
    'Lighthouse Results',
    'URL | Performance | Accessibility | Best Practices | SEO | Report',
    '| - | - | - | - | - | - |',
  ];

  // map over each url result, formatting and linking to the output
  const urlResults = results.map(({ url, summary }) => {
    return `[${url.replace(
      process.env.VERCEL_PREVIEW_URL,
      ''
    )}](${url}) | ${formatScore(summary.performance)} | ${formatScore(
      summary.accessibility
    )} | ${formatScore(summary['best-practices'])} | ${formatScore(
      summary.seo
    )} | [🔗](${links[url]})`;
  });

  const finalResults = [...header, ...urlResults].join('\n');
  core.setOutput('comment', finalResults);
};
