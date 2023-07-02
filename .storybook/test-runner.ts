import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postRender(page, _context) {
    const rootElementId = '[data-test-id="story-root"]';
    const rootElement = await page.locator(rootElementId);
    const content = await rootElement.innerHTML();
    expect(content).toBeDefined();
    expect(content).toMatchSnapshot();
  },
};

export default config;
