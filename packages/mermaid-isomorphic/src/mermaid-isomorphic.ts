import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { type Mermaid, type MermaidConfig } from 'mermaid';
import {
  type BrowserType,
  chromium,
  type LaunchOptions,
  type Page,
} from 'playwright';

declare const mermaid: Mermaid;

/**
 * NOTE: `import.meta.resolve` is not available in Webpack/turbopack/swc context.
 * So we use pure Node.js APIs to resolve the paths.
 * But `import.meta.url` is still available in the Webpack/turbopack/swc context.
 */

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html = pathToFileURL(join(__dirname, '../index.html')).href;
const mermaidScript = {
  url: pathToFileURL(require.resolve('mermaid/dist/mermaid.js')).href,
};
const faStyle = {
  url: pathToFileURL(
    require.resolve('@fortawesome/fontawesome-free/css/all.css')
  ).href,
};

export interface CreateMermaidRendererOptions {
  /**
   * The Playwright browser to use.
   *
   * @default chromium
   */
  browserType?: BrowserType;

  /**
   * The options used to launch the browser.
   */
  launchOptions?: LaunchOptions;
}

export interface RenderResult {
  /**
   * The aria description of the diagram.
   */
  description?: string;

  /**
   * The height of the resulting SVG.
   */
  height: number;

  /**
   * The DOM id of the SVG node.
   */
  id: string;

  /**
   * The diagram SVG rendered as a PNG buffer.
   */
  screenshot?: Buffer;

  /**
   * The diagram rendered as an SVG.
   */
  svg: string;

  /**
   * The title of the rendered diagram.
   */
  title?: string;

  /**
   * The width of the resulting SVG.
   */
  width: number;
}

export interface RenderOptions {
  /**
   * A URL that points to a custom CSS file to load.
   *
   * Use this to load custom fonts.
   *
   * This option is ignored in the browser. You need to include the CSS in your build manually.
   */
  css?: Iterable<URL | string> | URL | string | undefined;

  /**
   * If true, a PNG screenshot of the diagram will be added.
   *
   * This is only supported in the Node.js.
   */
  screenshot?: boolean;

  /**
   * The mermaid configuration.
   *
   * By default `fontFamily` is set to `arial,sans-serif`.
   *
   * This option is ignored in the browser. You need to call `mermaid.initialize()` manually.
   */
  mermaidConfig?: MermaidConfig;

  /**
   * The prefix of the id.
   *
   * @default 'mermaid'
   */
  prefix?: string | undefined;
}

/**
 * Render Mermaid diagrams in the browser.
 *
 * @param diagrams
 *   The Mermaid diagrams to render.
 * @param options
 *   Additional options to use when rendering the diagrams.
 * @returns
 *   A list of settled promises that contains the rendered Mermaid diagram. Each result matches the
 *   same index of the input diagrams.
 */
export type MermaidRenderer = (
  diagrams: string[],
  options?: RenderOptions
) => Promise<PromiseSettledResult<RenderResult>[]>;

interface RenderDiagramsOptions
  extends Required<
    Pick<RenderOptions, 'mermaidConfig' | 'prefix' | 'screenshot'>
  > {
  /**
   * The diagrams to process.
   */
  diagrams: string[];
}

/* c8 ignore start */
/**
 * Render mermaid diagrams in the browser.
 *
 * @param options
 *   The options used to render the diagrams
 * @returns
 *   A settled promise that holds the rendering results.
 */
async function renderDiagrams({
  diagrams,
  mermaidConfig,
  prefix,
  screenshot,
}: RenderDiagramsOptions): Promise<PromiseSettledResult<RenderResult>[]> {
  await Promise.all(Array.from(document.fonts, font => font.load()));
  const parser = new DOMParser();
  const serializer = new XMLSerializer();

  mermaid.initialize(mermaidConfig);

  /**
   * Get an aria value form a referencing attribute.
   *
   * @param element
   *   The SVG element the get the value from.
   * @param attribute
   *   The attribute whose value to get.
   * @returns
   *   The aria value.
   */
  function getAriaValue(
    element: SVGSVGElement,
    attribute: string
  ): string | undefined {
    const value = element.getAttribute(attribute);
    if (!value) {
      return;
    }

    let result = '';
    for (const id of value.split(/\s+/)) {
      const node = element.getElementById(id);
      if (node) {
        result += node.textContent;
      }
    }
    return result;
  }

  return Promise.allSettled(
    diagrams.map(async (diagram, index) => {
      const id = `${prefix}-${index}`;

      try {
        const { svg } = await mermaid.render(id, diagram);
        const root = parser.parseFromString(svg, 'text/html');
        const [element] = root.getElementsByTagName('svg');
        const { height, width } = element.viewBox.baseVal;
        const description = getAriaValue(element, 'aria-describedby');
        const title = getAriaValue(element, 'aria-labelledby');

        if (screenshot) {
          document.body.append(element);
        }

        const result: RenderResult = {
          height,
          id,
          svg: serializer.serializeToString(element),
          width,
        };

        if (description) {
          result.description = description;
        }

        if (title) {
          result.title = title;
        }

        return result;
      } catch (error) {
        throw error instanceof Error
          ? { name: error.name, stack: error.stack, message: error.message }
          : error;
      }
    })
  );
}

/* c8 ignore stop */

interface SimpleContext {
  /**
   * Gracefully close the browser context and the browser.
   */
  close: () => Promise<undefined>;

  /**
   * Open a new page.
   */
  newPage: () => Promise<Page>;
}

/**
 * Launch a browser and a single browser context.
 *
 * @param browserType
 *   The browser type to launch.
 * @param launchOptions
 *   Optional launch options
 * @returns
 *   A simple browser context wrapper
 */
async function getBrowser(
  browserType: BrowserType,
  launchOptions: LaunchOptions | undefined
): Promise<SimpleContext> {
  const browser = await browserType.launch(launchOptions);
  const context = await browser.newContext({ bypassCSP: true });

  return {
    async close() {
      await context.close();
      await browser.close();
    },

    newPage() {
      return context.newPage();
    },
  };
}

/**
 * Create a Mermaid renderer.
 *
 * The Mermaid renderer manages a browser instance. If multiple diagrams are being rendered
 * simultaneously, the internal browser instance will be re-used. If no diagrams are being rendered,
 * the browser will be closed.
 *
 * @param options
 *   The options of the Mermaid renderer.
 * @returns
 *   A function that renders Mermaid diagrams in the browser.
 */
export function createMermaidRenderer(
  options: CreateMermaidRendererOptions = {}
): MermaidRenderer {
  const { browserType = chromium, launchOptions } = options;

  let browserPromise: Promise<SimpleContext> | undefined;
  let count = 0;

  return async (diagrams, renderOptions) => {
    count += 1;
    if (!browserPromise) {
      browserPromise = getBrowser(browserType, launchOptions);
    }

    const context = await browserPromise;

    let page: Page | undefined;
    let renderResults: PromiseSettledResult<RenderResult>[];

    try {
      page = await context.newPage();
      await page.goto(html);
      const promises = [
        page.addStyleTag(faStyle),
        page.addScriptTag(mermaidScript),
      ];
      const css = renderOptions?.css;
      if (typeof css === 'string' || css instanceof URL) {
        promises.push(page.addStyleTag({ url: String(css) }));
      } else if (css) {
        for (const url of css) {
          promises.push(page.addStyleTag({ url: String(url) }));
        }
      }
      await Promise.all(promises);

      renderResults = await page.evaluate(renderDiagrams, {
        diagrams,
        screenshot: Boolean(renderOptions?.screenshot),
        mermaidConfig: {
          fontFamily: 'arial,sans-serif',
          ...renderOptions?.mermaidConfig,
        },
        prefix: renderOptions?.prefix ?? 'mermaid',
      });
      if (renderOptions?.screenshot) {
        for (const result of renderResults) {
          if (result.status === 'fulfilled') {
            result.value.screenshot = await page
              .locator(`#${result.value.id}`)
              .screenshot({ omitBackground: true });
          }
        }
      }
    } finally {
      await page?.close();
      count -= 1;
      if (!count) {
        browserPromise = undefined;
        context.close();
      }
    }

    for (const result of renderResults) {
      if (result.status !== 'rejected') {
        continue;
      }

      const { reason } = result;

      if (
        reason &&
        'name' in reason &&
        'message' in reason &&
        'stack' in reason
      ) {
        Object.setPrototypeOf(reason, Error.prototype);
      }
    }

    return renderResults;
  };
}
