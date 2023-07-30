import type { TestRunnerConfig } from '@storybook/test-runner';

// This is the PlayWright Selector for getting the Storybook root Element
const STORYBOOK_ELEMENT_ID = '[data-test-id="story-root"]';

const config: TestRunnerConfig = {
  // This method replaces Storybook's Test Runner default `prepare` method
  // This is a lightweight method with extra checks of content loading
  prepare: async ({ page }) => {
    // We want a small viewport as we don't need something big for our Components
    await page.setViewportSize({ width: 768, height: 1024 });

    // We get the URL of the current Story from the current process.env variable
    const targetURL = process.env.TARGET_URL;

    // We append the targetURL to the iframeURL and then we navigate to the Iframe
    const iframeURL = new URL('iframe.html', targetURL).toString();

    // Navigates to the Story's Iframe and waits for the page to render
    await page.goto(iframeURL);

    // We wait for the document to have its initial looading finished
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('load');
  },
  postRender: async (page, context) => {
    // This is the minimum time we've noticed for the content to safely be rendered
    await page.waitForTimeout(1000);

    // We attempt to get the Storybook root Element
    const rootElement = await page.$(STORYBOOK_ELEMENT_ID);

    // Then we rewrite the inner HTML content
    const content = await rootElement.innerHTML();

    expect(content).toBeDefined();

    // We remove specific HTML tags whose values are auto-generated or can change from deployment to deployment
    // this reduces the effectiveness of the stories but it's a trade-off we have to make
    expect(content.replace(/(class|src|href)="(.*?)"/gm, '')).toMatchSnapshot();
  },
};

export default config;
