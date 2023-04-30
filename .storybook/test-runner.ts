// TODO: Convert this to ESM once the bug is resolved
// https://github.com/storybookjs/test-runner/issues/293

const config = {
  async postRender(page, _context) {
    const rootElementId = '[data-test-id="story-root"]';
    const rootElement = await page.locator(rootElementId);
    expect(rootElement).toBeDefined();

    const content = await rootElement.innerHTML();
    expect(content).toMatchSnapshot();
  },
};

module.exports = config;
