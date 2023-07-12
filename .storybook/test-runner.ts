import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  postRender: async (page, context) => {
    // Gather the page HTML inner content for a DOM HTML Snapshot
    const rootElementId = '[data-test-id="story-root"]';
    const rootElement = await page.locator(rootElementId);
    const content = await rootElement.innerHTML();

    expect(content).toBeDefined();
    expect(content.replace(/class="(.*?)"/gm, '')).toMatchSnapshot();
  },
};

export default config;
