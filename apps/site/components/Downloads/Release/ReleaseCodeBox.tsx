'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useContext, useMemo } from 'react';

import AlertBox from '@/components/Common/AlertBox';
import Skeleton from '@/components/Common/Skeleton';
import JSXCodeBox from '@/components/JSX/CodeBox';
import Link from '@/components/Link';
import { createSval } from '@/next.jsx.compiler.mjs';
import { ReleaseContext, ReleasesContext } from '@/providers/releaseProvider';
import type { ReleaseContextType } from '@/types/release';
import { INSTALL_METHODS } from '@/util/downloadUtils';

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
  const {
    installMethod: platform,
    os,
    packageManager,
    release,
  } = useContext(ReleaseContext);

  const t = useTranslations();

  // Retrieves the current platform (Dropdown Item) based on the selected platform value
  const currentPlatform = useMemo(
    () => INSTALL_METHODS.find(({ value }) => value === platform),
    [platform]
  );

  // Parses the snippets based on the selected platform, package manager, and release context
  const parsedSnippets = useMemo(() => {
    // Retrieves a snippet for the given Installation Method (aka Platform)
    const platformSnippet = snippets.find(
      s => s.name === platform.toLowerCase()
    );

    // Retrieves a snippet for the given Package Manager to be bundled with the Platform snippet
    const packageManagerSnippet = snippets.find(
      s => s.name === packageManager.toLowerCase()
    );

    return parseSnippet(
      // Bundles the Platform and Package Manager snippets
      `${platformSnippet?.content ?? ''}\n${packageManagerSnippet?.content ?? ''}`,
      // Passes a partial state of only the things we need to the parser
      { release, installMethod: platform, os } as ReleaseContextType
    );
  }, [snippets, release, platform, os, packageManager]);

  // Determines the code language based on the OS
  const codeLanguage = os === 'WIN' ? 'ps1' : 'bash';

  // Determines if the code box should render the skeleton loader
  const renderSkeleton = os === 'LOADING' || platform === '';

  // Defines fallbacks for the currentPlatform object
  const {
    label = '',
    url = '',
    info = 'layouts.download.codeBox.platformInfo.default',
  } = currentPlatform ?? {};

  return (
    <div className="mb-6 mt-4 flex flex-col gap-2">
      {release.status === 'End-of-life' && (
        <AlertBox title="Warning" level="warning" size="small">
          {t.rich('layouts.download.codeBox.unsupportedVersionWarning', {
            link: text => <Link href="/about/previous-releases/">{text}</Link>,
          })}
        </AlertBox>
      )}

      {!currentPlatform || currentPlatform.recommended || (
        <AlertBox title="Info" level="info" size="small">
          {t('layouts.download.codeBox.communityPlatformInfo')}
        </AlertBox>
      )}

      <Skeleton loading={renderSkeleton}>
        <JSXCodeBox language={codeLanguage} className="min-h-[15.5rem]">
          {parsedSnippets}
        </JSXCodeBox>
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
