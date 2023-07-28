import type { TestRunnerConfig } from '@storybook/test-runner';

const STORYBOOK_ELEMENT_ID = '[data-test-id="story-root"]';

const config: TestRunnerConfig = {
  // This method replaces Storybook's Test Runner default `prepare` method
  // This is a lightweight method with extra checks of content loading
  prepare: async ({ page }) => {
    const targetURL = process.env.TARGET_URL;
    const iframeURL = new URL('iframe.html', targetURL).toString();

    await page.goto(iframeURL);

    // We wait for the document to have its initial looading finished
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');

    // This is the minimum time we've noticed for the content to safely be rendered
    await page.waitForTimeout(1000);
  },
  postRender: async page => {
    // We attempt to get the Storybook root Element
    const rootElement = await page.locator(STORYBOOK_ELEMENT_ID);

    // Then we rewrite the inner HTML content
    const content = await rootElement.innerHTML();

    expect(content).toBeDefined();

    // We stripe specific HTML tags whose values are auto-generated or can change from deployment to deployment
    // this reduces the effectiveness of the stories but it's a trade-off we have to make
    expect(content.replace(/(class|src|href)="(.*?)"/gm, '')).toMatchSnapshot();
  },
};

export default config;
