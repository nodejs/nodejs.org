/* global core */

const result = process.env.LIGHTHOUSE_RESULT;
const links = process.env.LIGHTHOUSE_LINKS[0];

const formatResult = res => Math.round(res * 100);
Object.keys(result).forEach(key => (result[key] = formatResult(result[key])));

const score = res => (res >= 90 ? '🟢' : res >= 50 ? '🟠' : '🔴');

const comment = [
  `⚡️ [Lighthouse report](${Object.values(
    links
  )}) for the changes in this PR:`,
  '| Category | Score |',
  '| --- | --- |',
  `| ${score(result.performance)} Performance | ${result.performance} |`,
  `| ${score(result.accessibility)} Accessibility | ${result.accessibility} |`,
  `| ${score(result['best-practices'])} Best practices | ${
    result['best-practices']
  } |`,
  `| ${score(result.seo)} SEO | ${result.seo} |`,
  `| ${score(result.pwa)} PWA | ${result.pwa} |`,
  ' ',
  `*Lighthouse ran on [${Object.keys(links)}](${Object.keys(links)[0]})*`,
].join('\n');

core.setOutput('comment', comment);
