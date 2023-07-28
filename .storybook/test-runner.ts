import type { TestRunnerConfig } from '@storybook/test-runner';

const STORYBOOK_ELEMENT_ID = '[data-test-id="story-root"]';

const config: TestRunnerConfig = {
  postRender: async page => {
    // We wait for the page to load for at least one second
    // as there's no reliable way globally to ensure everything loaded correctly
    await page.waitForTimeout(500);

    // We attempt to get the Storybook root Element
    const rootElement = await page.locator(STORYBOOK_ELEMENT_ID);

    // Then we rewrite the inner HTML content
    const content = await rootElement.innerHTML();

    expect(content).toBeDefined();

    // We strip the `class` tags from the HTML content as we do not want
    // to pollute the snapshots with generated class names
    expect(content.replace(/(class|src|href)="(.*?)"/gm, '')).toMatchSnapshot();
  },
};

export default config;
