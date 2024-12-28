'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useContext, useMemo } from 'react';

import AlertBox from '@/components/Common/AlertBox';
import CodeBox from '@/components/Common/CodeBox';
import Skeleton from '@/components/Common/Skeleton';
import Link from '@/components/Link';
import { createSval } from '@/next.jsx.compiler.mjs';
import { ReleaseContext, ReleasesContext } from '@/providers/releaseProvider';
import type { ReleaseContextType } from '@/types/release';
import { INSTALL_METHODS } from '@/util/downloadUtils';
import { highlightToHtml } from '@/util/getHighlighter';

import LinkWithArrow from './LinkWithArrow';

// Creates a minimal JavaScript interpreter for parsing the JavaScript code from the snippets
// Note: that the code runs inside a sandboxed environment and cannot interact with any code outside of the sandbox
// It also does not have access to any Global or Window objects, nor it can execute code on the end-user's browser
// It also only allows a return statement for a string and it forces the return value to also be a string and only be used
// by Shiki to render the highlighted syntax. Hence XSS attacks or JavaScript injections are not possible.
const interpreter = createSval({}, 'script');

const parseSnippet = (s: string, releaseContext: ReleaseContextType) => {
  // Adds the release context to the interpreter context
  interpreter.import({ props: releaseContext });

  // Evaluates the JavaScript code applying the release context to the code
  interpreter.run(`exports.content = \`${s}\``);

  // Sets the parsed raw string to be used by the JSX CodeBox
  return String(interpreter.exports.content);
};

const ReleaseCodeBox: FC = () => {
  const { snippets } = useContext(ReleasesContext);
  const { installMethod, os, packageManager, release } =
    useContext(ReleaseContext);

  const t = useTranslations();

  // Retrieves the current platform (Dropdown Item) based on the selected platform value
  const currentPlatform = useMemo(
    () => INSTALL_METHODS.find(({ value }) => value === installMethod),
    [installMethod]
  );

  // Parses the snippets based on the selected platform, package manager, and release context
  const parsedSnippets = useMemo(() => {
    // Retrieves a snippet for the given Installation Method (aka Platform)
    const installMethodSnippet = snippets.find(
      ({ name }) => name === installMethod.toLowerCase()
    );

    // Retrieves a snippet for the given Package Manager to be bundled with the Platform snippet
    const packageManagerSnippet = snippets.find(
      ({ name }) => name === packageManager.toLowerCase()
    );

    // Prevents numerous recalculations of `sval` and `Shiki` when not necessary
    // As we only want to parse the snippets when both the Platform and Package Manager snippets are available
    if (installMethodSnippet && packageManagerSnippet) {
      const content = parseSnippet(
        // Bundles the Platform and Package Manager snippets
        `${installMethodSnippet.content}\n${packageManagerSnippet.content}`,
        // Passes a partial state of only the things we need to the parser
        { release, os } as ReleaseContextType
      );

      // We use Shikis's `hast-util-to-html` to convert the highlighted code into plain HTML (Pretty much using Rehype)
      // This is actually faster than using `hast-util-to-jsx-runtime` and then rendering the JSX
      // As it requires React's runtime to interpolate and build these components dynamically
      // Which also leads to a lot o GC being emitted. (Tested via Profiling)
      return highlightToHtml(content, os === 'WIN' ? 'ps1' : 'bash');
    }

    return '';
    // Only change to these specific properties which are relevant for the re-rendering of the CodeBox
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release.versionWithPrefix, installMethod, os, packageManager]);

  // Determines the code language based on the OS
  const displayName = os === 'WIN' ? 'PowerShell' : 'Bash';

  // Determines if the code box should render the skeleton loader
  const renderSkeleton = os === 'LOADING' || installMethod === '';

  // Defines fallbacks for the currentPlatform object
  const {
    label = '',
    url = '',
    info = 'layouts.download.codeBox.platformInfo.default',
  } = currentPlatform ?? {};

  return (
    <div className="mb-6 mt-4 flex flex-col gap-2">
      <noscript>
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t.rich('layouts.download.codeBox.noScriptDetected', {
            link: text => (
              <Link href="/about/previous-releases#looking-for-latest-release-of-a-version-branch">
                <b>{text}</b>
              </Link>
            ),
          })}
        </AlertBox>
      </noscript>

      {release.status === 'End-of-life' && (
        <AlertBox
          title={t('components.common.alertBox.warning')}
          level="warning"
          size="small"
        >
          {t.rich('layouts.download.codeBox.unsupportedVersionWarning', {
            link: text => <Link href="/about/previous-releases/">{text}</Link>,
          })}
        </AlertBox>
      )}

      {!currentPlatform || currentPlatform.recommended || (
        <AlertBox
          title={t('components.common.alertBox.info')}
          level="info"
          size="small"
        >
          {t('layouts.download.codeBox.communityPlatformInfo')}
        </AlertBox>
      )}

      <Skeleton loading={renderSkeleton}>
        <CodeBox language={displayName} className="min-h-[16.5rem]">
          <code dangerouslySetInnerHTML={{ __html: parsedSnippets }} />
        </CodeBox>
      </Skeleton>

      <span className="text-center text-xs text-neutral-800 dark:text-neutral-200">
        <Skeleton loading={renderSkeleton} hide={!currentPlatform}>
          {t(info, { platform: label })}{' '}
          {t.rich('layouts.download.codeBox.externalSupportInfo', {
            platform: label,
            link: text => (
              <LinkWithArrow href={url}>
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
