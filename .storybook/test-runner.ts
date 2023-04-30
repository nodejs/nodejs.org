// TODO: Convert this to ESM once the bug is resolved
// https://github.com/storybookjs/test-runner/issues/293

const config = {
  async postRender(page, _context) {
    const elem = await page.locator('[data-test-id="story-root"]');
    if (!elem) {
      throw new Error('Story Root element missing!')
    }
    const html = await elem.innerHTML();
    expect(html).toMatchSnapshot();
  },
};

module.exports = config;
