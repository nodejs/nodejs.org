'use client';

import { highlightToHtml } from '@node-core/rehype-shiki/minimal';
import AlertBox from '@node-core/ui-components/Common/AlertBox';
import Skeleton from '@node-core/ui-components/Common/Skeleton';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useContext, useMemo } from 'react';

import CodeBox from '#site/components/Common/CodeBox';
import LinkWithArrow from '#site/components/Common/LinkWithArrow';
import Link from '#site/components/Link';
import WithReleaseAlertBox from '#site/components/withReleaseAlertBox';
import {
  ReleaseContext,
  ReleasesContext,
} from '#site/providers/releaseProvider';
import type { DownloadSnippet } from '#site/types/download';
import type { ReleaseContextType } from '#site/types/release';
import { INSTALL_METHODS } from '#site/util/download';
import createInterpreter from '#site/util/interpreter';

// Creates a minimal JavaScript interpreter for parsing the JavaScript code from the snippets
// Note: that the code runs inside a sandboxed environment and cannot interact with any code outside of the sandbox
// It also does not have access to any Global or Window objects, nor it can execute code on the end-user's browser
// It also only allows a return statement for a string and it forces the return value to also be a string and only be used
// by Shiki to render the highlighted syntax. Hence XSS attacks or JavaScript injections are not possible.
const interpreter = createInterpreter({}, 'script');

/**
 * Parses a snippet string using the interpreter with the given release context
 */
const parseSnippet = (snippet: string, releaseContext: ReleaseContextType) => {
  interpreter.import({ props: releaseContext });
  interpreter.run(`exports.content = \`${snippet}\``);
  return interpreter.exports.content;
};

/**
 * Custom hook to handle snippet processing logic
 */
const useSnippetProcessor = (
  snippets: Array<DownloadSnippet>,
  context: ReleaseContextType
) => {
  return useMemo(() => {
    // Find relevant snippets
    const installMethodSnippet = snippets.find(
      ({ name }) => name === context.installMethod.toLowerCase()
    );

    const packageManagerSnippet = snippets.find(
      ({ name }) => name === context.packageManager.toLowerCase()
    );

    // Only process if both snippets are available
    if (!installMethodSnippet || !packageManagerSnippet) {
      return '';
    }

    const verifyNodeSnippet = snippets.find(({ name }) => name === 'node');

    const installCorepackSnippet =
      context.packageManager !== 'NPM' &&
      // Corepack is no longer distributed with Node.js v25
      context.release.major >= 25 &&
      snippets.find(({ name }) => name === 'corepack');

    // Combine and parse snippets
    const parsedContent = parseSnippet(
      [
        installMethodSnippet,
        verifyNodeSnippet,
        installCorepackSnippet,
        packageManagerSnippet,
      ]
        .filter(Boolean)
        .map(snippet => (snippet as DownloadSnippet).content)
        .join('\n'),
      context
    );

    // Convert to HTML using Shiki's highlighter
    // This is faster than JSX rendering as it avoids React runtime overhead
    return highlightToHtml(
      parsedContent,
      context.os === 'WIN' ? 'ps1' : 'bash'
    );
  }, [snippets, context]);
};

/**
 * Custom hook to get current platform information
 */
const usePlatformInfo = (installMethod: string) => {
  return useMemo(() => {
    const platform = INSTALL_METHODS.find(
      ({ value }) => value === installMethod
    );

    // Provide defaults for destructuring
    return {
      label: platform?.label || '',
      url: platform?.url || '',
      info: platform?.info || 'layouts.download.codeBox.platformInfo.default',
      recommended: platform?.recommended || false,
      exists: !!platform,
    };
  }, [installMethod]);
};

/**
 * ReleaseCodeBox component displays installation instructions based on platform and context
 */
const ReleaseCodeBox: FC = () => {
  const { snippets } = useContext(ReleasesContext);
  const context = useContext(ReleaseContext);
  const t = useTranslations();

  // Process platform information
  const platformInfo = usePlatformInfo(context.installMethod);

  // Process snippets
  const parsedSnippets = useSnippetProcessor(snippets, context);

  // UI state calculations
  const displayLanguage = context.os === 'WIN' ? 'PowerShell' : 'Bash';
  const isLoading = context.os === 'LOADING' || context.installMethod === '';

  return (
    <div className="mt-4 mb-6 flex flex-col gap-2">
      {/* NoScript warning */}
      <noscript>
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t.rich('layouts.download.codeBox.noScriptDetected', {
            link: text => (
              <Link href="/download/archive/current">
                <b>{text}</b>
              </Link>
            ),
          })}
        </AlertBox>
      </noscript>

      {/* Release status alert */}
      <WithReleaseAlertBox status={context.release.status} />

      {/* Community platform notice */}
      {platformInfo.exists && !platformInfo.recommended && (
        <AlertBox
          title={t('components.common.alertBox.info')}
          level="info"
          size="small"
        >
          {t('layouts.download.codeBox.communityPlatformInfo')}
        </AlertBox>
      )}

      {/* Code display with skeleton loading */}
      <Skeleton loading={isLoading}>
        <CodeBox language={displayLanguage} className="min-h-[19rem]">
          <code dangerouslySetInnerHTML={{ __html: parsedSnippets }} />
        </CodeBox>
      </Skeleton>

      {/* Platform info footer */}
      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        <Skeleton loading={isLoading} hide={!platformInfo.exists}>
          {t(platformInfo.info, { platform: platformInfo.label })}{' '}
          {t.rich('layouts.download.codeBox.externalSupportInfo', {
            platform: platformInfo.label,
            link: text => (
              <LinkWithArrow href={platformInfo.url}>
                <b>{text}</b>
              </LinkWithArrow>
            ),
          })}
        </Skeleton>
      </span>
    </div>
  );
};

export default ReleaseCodeBox;
