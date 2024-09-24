'use strict';

const stoplight = res => (res >= 90 ? '🟢' : res >= 75 ? '🟠' : '🔴');
const normalizeScore = res => Math.round(res * 100);
const formatScore = res => {
  const normalizedScore = normalizeScore(res);
  return `${stoplight(normalizedScore)} ${normalizedScore}`;
};

/**
 * `core` is in scope from https://github.com/actions/github-script
 */
export const formatLighthouseResults = ({ core }) => {
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
    // make the tested link as a markdown link, without the long-generated host
    const shortPreviewLink = `[${url.replace(
      process.env.VERCEL_PREVIEW_URL,
      ''
    )}](${url})`;

    // make each formatted score from our lighthouse properties
    const performanceScore = formatScore(summary.performance);
    const accessibilityScore = formatScore(summary.accessibility);
    const bestPracticesScore = formatScore(summary['best-practices']);
    const seoScore = formatScore(summary.seo);

    // create the markdown table row
    return `${shortPreviewLink} | ${performanceScore} | ${accessibilityScore} | ${bestPracticesScore} | ${seoScore} | [🔗](${links[url]})`;
  });

  // join the header and  the rows together
  const finalResults = [...header, ...urlResults].join('\n');

  // return our output to the github action
  core.setOutput('comment', finalResults);
};
