import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { VFile } from 'vfile';

import Button from '@/components/Common/Button';
import ChangelogModal from '@/components/Downloads/ChangelogModal';
import { MDXRenderer } from '@/components/mdxRenderer';
import { compileMDX } from '@/next.mdx.compiler.mjs';
import { getGitHubAvatarUrl } from '@/util/gitHubUtils';

type Story = StoryObj<typeof ChangelogModal>;
type Meta = MetaObj<typeof ChangelogModal>;

const names = [
  'ovflowd',
  'bmuenzenmeyer',
  'AugustinMauroy',
  'HinataKah0',
  'Harkunwar',
  'rodion-arr',
  'mikeesto',
  'bnb',
  'benhalverson',
  'aymen94',
  'shanpriyan',
  'Wai-Dung',
  'manishprivet',
  'araujogui',
  'thefossildev',
];

const children = `
### Notable Changes

#### Ada 2.0

Node.js v18.17.0 comes with the latest version of the URL parser, Ada. This update brings significant performance improvements
to URL parsing, including enhancements to the url.domainToASCII and url.domainToUnicode functions in node:url.

Ada 2.0 has been integrated into the Node.js codebase, ensuring that all parts of the application can benefit from the
improved performance. Additionally, Ada 2.0 features a significant performance boost over its predecessor, Ada 1.0.4,
while also eliminating the need for the ICU requirement for URL hostname parsing.

Contributed by Yagiz Nizipli and Daniel Lemire in [#47339](https://github.com/nodejs/node/pull/47339)

#### Web Crypto API

Web Crypto API functions' arguments are now coerced and validated as per their WebIDL definitions like in other Web Crypto API implementations.
This further improves interoperability with other implementations of Web Crypto API.

Contributed by Filip Skokan in [#46067](https://github.com/nodejs/node/pull/46067)

- **crypto**:
  - update root certificates to NSS 3.89 (Node.js GitHub Bot) [#47659](https://github.com/nodejs/node/pull/47659)
- **dns**:
  - **(SEMVER-MINOR)** expose getDefaultResultOrder (btea) [#46973](https://github.com/nodejs/node/pull/46973)
- **doc**:
  - add ovflowd to collaborators (Claudio Wunder) [#47844](https://github.com/nodejs/node/pull/47844)
  - add KhafraDev to collaborators (Matthew Aitken) [#47510](https://github.com/nodejs/node/pull/47510)
- **events**:
  - **(SEMVER-MINOR)** add getMaxListeners method (Matthew Aitken) [#47039](https://github.com/nodejs/node/pull/47039)
- **fs**:
  - **(SEMVER-MINOR)** add support for mode flag to specify the copy behavior (Tetsuharu Ohzeki) [#47084](https://github.com/nodejs/node/pull/47084)
  - **(SEMVER-MINOR)** add recursive option to readdir and opendir (Ethan Arrowood) [#41439](https://github.com/nodejs/node/pull/41439)
  - **(SEMVER-MINOR)** add support for mode flag to specify the copy behavior (Tetsuharu Ohzeki) [#47084](https://github.com/nodejs/node/pull/47084)
  - **(SEMVER-MINOR)** implement byob mode for readableWebStream() (Debadree Chatterjee) [#46933](https://github.com/nodejs/node/pull/46933)
- **http**:
  - **(SEMVER-MINOR)** prevent writing to the body when not allowed by HTTP spec (Gerrard Lindsay) [#47732](https://github.com/nodejs/node/pull/47732)
  - **(SEMVER-MINOR)** remove internal error in assignSocket (Matteo Collina) [#47723](https://github.com/nodejs/node/pull/47723)
  - **(SEMVER-MINOR)** add highWaterMark opt in http.createServer (HinataKah0) [#47405](https://github.com/nodejs/node/pull/47405)
- **lib**:
  - **(SEMVER-MINOR)** add webstreams to Duplex.from() (Debadree Chatterjee) [#46190](https://github.com/nodejs/node/pull/46190)
  - **(SEMVER-MINOR)** implement AbortSignal.any() (Chemi Atlow) [#47821](https://github.com/nodejs/node/pull/47821)
- **module**:
  - change default resolver to not throw on unknown scheme (Gil Tayar) [#47824](https://github.com/nodejs/node/pull/47824)
- **node-api**:
  - **(SEMVER-MINOR)** define version 9 (Chengzhong Wu) [#48151](https://github.com/nodejs/node/pull/48151)
  - **(SEMVER-MINOR)** deprecate napi_module_register (Vladimir Morozov) [#46319](https://github.com/nodejs/node/pull/46319)
- **stream**:
  - **(SEMVER-MINOR)** preserve object mode in compose (Raz Luvaton) [#47413](https://github.com/nodejs/node/pull/47413)
  - **(SEMVER-MINOR)** add setter & getter for default highWaterMark (#46929) (Robert Nagy) [#46929](https://github.com/nodejs/node/pull/46929)
- **test**:
  - unflake test-vm-timeout-escape-nexttick (Santiago Gimeno) [#48078](https://github.com/nodejs/node/pull/48078)
- **test_runner**:
  - **(SEMVER-MINOR)** add shorthands to \`test\` (Chemi Atlow) [#47909](https://github.com/nodejs/node/pull/47909)
  - **(SEMVER-MINOR)** support combining coverage reports (Colin Ihrig) [#47686](https://github.com/nodejs/node/pull/47686)
  - **(SEMVER-MINOR)** execute before hook on test (Chemi Atlow) [#47586](https://github.com/nodejs/node/pull/47586)
  - **(SEMVER-MINOR)** expose reporter for use in run api (Chemi Atlow) [#47238](https://github.com/nodejs/node/pull/47238)
- **tools**:
  - update LICENSE and license-builder.sh (Santiago Gimeno) [#48078](https://github.com/nodejs/node/pull/48078)
- **url**:
  - **(SEMVER-MINOR)** implement URL.canParse (Matthew Aitken) [#47179](https://github.com/nodejs/node/pull/47179)
- **wasi**:
  - **(SEMVER-MINOR)** no longer require flag to enable wasi (Michael Dawson) [#47286](https://github.com/nodejs/node/pull/47286)

### Commits

- [[\`2ba08ac002\`](https://github.com/nodejs/node/commit/2ba08ac002)] - **benchmark**: use \`cluster.isPrimary\` instead of \`cluster.isMaster\` (Deokjin Kim) [#48002](https://github.com/nodejs/node/pull/48002)
- [[\`60ca69d96c\`](https://github.com/nodejs/node/commit/60ca69d96c)] - **benchmark**: add eventtarget creation bench (Rafael Gonzaga) [#47774](https://github.com/nodejs/node/pull/47774)
- [[\`d8233d96bb\`](https://github.com/nodejs/node/commit/d8233d96bb)] - **benchmark**: add a benchmark for \`defaultResolve\` (Antoine du Hamel) [#47543](https://github.com/nodejs/node/pull/47543)
- [[\`a1aabb6912\`](https://github.com/nodejs/node/commit/a1aabb6912)] - **benchmark**: fix invalid requirementsURL (Deokjin Kim) [#47378](https://github.com/nodejs/node/pull/47378)
- [[\`394c61caf9\`](https://github.com/nodejs/node/commit/394c61caf9)] - **bootstrap**: support namespaced builtins in snapshot scripts (Joyee Cheung) [#47467](https://github.com/nodejs/node/pull/47467)
- [[\`78972d4696\`](https://github.com/nodejs/node/commit/78972d4696)] - **worker**: support more cases when (de)serializing errors (Moshe Atlow) [#47925](https://github.com/nodejs/node/pull/47925)

Windows 32-bit Installer: https://nodejs.org/dist/v18.17.0/node-v18.17.0-x86.msi \\
Windows 64-bit Installer: https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi \\
Windows 32-bit Binary: https://nodejs.org/dist/v18.17.0/win-x86/node.exe \\
Windows 64-bit Binary: https://nodejs.org/dist/v18.17.0/win-x64/node.exe \\
macOS 64-bit Installer: https://nodejs.org/dist/v18.17.0/node-v18.17.0.pkg \\
macOS Apple Silicon 64-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-darwin-arm64.tar.gz \\
macOS Intel 64-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-darwin-x64.tar.gz \\
Linux 64-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-x64.tar.xz \\
Linux PPC LE 64-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-ppc64le.tar.xz \\
Linux s390x 64-bit Binary: _Coming soon_ \\
AIX 64-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-aix-ppc64.tar.gz \\
ARMv7 32-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-armv7l.tar.xz \\
ARMv8 64-bit Binary: https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-arm64.tar.xz \\
Source Code: https://nodejs.org/dist/v18.17.0/node-v18.17.0.tar.gz \\
Other release files: https://nodejs.org/dist/v18.17.0/ \\
Documentation: https://nodejs.org/docs/v18.17.0/api/

### SHASUMS

\`\`\`
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

b61952f8468fe50b24b46039ad795af4bbea3751ded7cb488ec52e5a332f91ce  node-v18.17.0-aix-ppc64.tar.gz
19731ef427e77ad9c5f476eb62bfb02a7f179d3012feed0bbded62e45f23e679  node-v18.17.0-darwin-arm64.tar.gz
621cf884c4c27ddc595ff23f35ccd6fa1e827470581c30d31d779ba3cd6a162e  node-v18.17.0-darwin-arm64.tar.xz
2f381442381f7fbde2ca644c3275bec9c9c2a8d361f467b40e39428acdd6ccff  node-v18.17.0-darwin-x64.tar.gz
774734231d484d72e14f3327db6d7915abd3e2164ba577dd78affa5eade48a11  node-v18.17.0-darwin-x64.tar.xz
7c47c07521f8be7693f3b0436d2ef0cb5a490d070d1d9a3606decc55c39c41c4  node-v18.17.0-headers.tar.gz
1a7a3bbb7299f69e16a8ee2b327dd1c4811a9376bcafe41f8310467a9a9e3307  node-v18.17.0-headers.tar.xz
9d586f9d8b73a121b8a5438079c7106379aaae868f945a9f1755565607607944  node-v18.17.0-linux-arm64.tar.gz
fbd2904178ee47da6e0386bc9704a12b1f613da6ad194878a517d4a69ba56544  node-v18.17.0-linux-arm64.tar.xz
a9c3a56b3a407eca1fef7c688e6e7774cc492c9a5ae74f0baff2d8fe9b7b74c3  node-v18.17.0-linux-armv7l.tar.gz
a2f12295b2da1db23d6f48c5bfb5969e7bf26f663ca8256e1c246ca0ee44a71f  node-v18.17.0-linux-armv7l.tar.xz
6da314c8ef1b6239290d9237ba14bd44cfd4382a6a59696a5f506c6c8dd353ad  node-v18.17.0-linux-ppc64le.tar.gz
9fd9c215be8e54dcf8bbc42ba9e1342b05136be4bc12594ee40a29cedfaeaffd  node-v18.17.0-linux-ppc64le.tar.xz
c39f8386ee916915949651cad3a735f988ec825c60fe591c0791b4883749bc8b  node-v18.17.0-linux-s390x.tar.gz
876ca54c246d24e346d0c740fbb72c9fb7353369127f20492bc923ee6d0121db  node-v18.17.0-linux-s390x.tar.xz
5c4a7fd9262c0c47bafab3442de6c3fed1602be3d243cb8cf11309a201955e75  node-v18.17.0-linux-x64.tar.gz
f36facda28c4d5ce76b3a1b4344e688d29d9254943a47f2f1909b1a10acb1959  node-v18.17.0-linux-x64.tar.xz
a4710e7da19464707582216557edcc5a15e29fca4a80599f89484cd867a66a73  node-v18.17.0.pkg
7aaa157c0219b5895a4bd51d9e9731e0d0eb0ab9424fdbdcf30d01b3e5fb74e9  node-v18.17.0.tar.gz
80c0faadf5ea39c213ccb9aa5c2432977a0f1b5a0b766852abd0de06f2770406  node-v18.17.0.tar.xz
daf06430be6380cd7416f0e9060b99bea821ceb72dacd55242ad84a5440cf45b  node-v18.17.0-win-x64.7z
06e30b4e70b18d794651ef132c39080e5eaaa1187f938721d57edae2824f4e96  node-v18.17.0-win-x64.zip
d02327ddb3a6895a79b641fa4a456590bd7c8f0070a1915f2f76a70fd4ea7cc9  node-v18.17.0-win-x86.7z
6aef2e2ca6e0edf3cc85b5d8ae640caaab46e98da378c749d79a34fd78e0416e  node-v18.17.0-win-x86.zip
dabdc4e683f0d0a835952ea5df61139fa6b679e25121d1941a2ae77d29e989f4  node-v18.17.0-x64.msi
724c4258aa878fd6286a41dc62a1128a10a918b5b3028de8d276126f3d1c5b1d  node-v18.17.0-x86.msi
da74bcc1606026f05523c33e7882cc0ca4e0786a532bb80f932873eca9bdb431  win-x64/node.exe
fce36923d974ac8f9cea4bd68e56ab055797fd5b5ede5041b228d642a0d9bb40  win-x64/node.lib
221209e2d1defb5a59900e6a05e1c4b3d5bebca80048df4649436346a7944e59  win-x64/node_pdb.7z
792a2f132f5753a21c241629956ac4b0251baafbbf1afb0fcd96cf6c672727a8  win-x64/node_pdb.zip
da188adf811f97ba7da777dca949456936cc2ce1a540175f5c9e4f64169bddaf  win-x86/node.exe
7982f49aac6ff5b4cfaa236793f62a8c18b0bc9f1f2903617b9fdafee377bb2b  win-x86/node.lib
38c62a693d89e4b38863268f7286fc3fab8d5ce24bd4b7b3ed5a151b9f1b53b7  win-x86/node_pdb.7z
2da36082fae828d4faf45226775a7bee90f3d6e7e92cbf7a69c89b287a762f89  win-x86/node_pdb.zip
-----BEGIN PGP SIGNATURE-----
iQIzBAEBCAAdFiEEdPEmArbxxOkT+qN606iWE2Q7YgEFAmS26kQACgkQ06iWE2Q7
YgGjxRAAnK6iw0ZQI6CvfuJgJsaV7bj3Y8nj/CvMaj7o2CzgMLpY4r8aj5Mlt60U
K2exJOY+h3Z6CQExZITp+k2v8j07R+xiCEYt9K6UkZwxbCI4UJNePGPjphHwq6/R
dQk9i6GRd1lhhSYxqEqRSSptY9vFKfEczJgyUqWQGtNCX1hW15osvK6B/tZN4/bs
sYnTEImOkoFjz3GRj8PEMv42tF7aRUhC2E8Xsl0jZlt/n9GWe7LX3f2OJfczafJo
Q7bj670pUCHxpHxvjHsg/lWDuunWDvNIZSMFvR71VI3PIe45s2WoRO/jDNxJ9wyt
CBlfb08LEOnBHxV8au1GZQqvRaLedD51j9N7IwvQb3DDdq7T3msuIDzlZiByj5aZ
E2wGiVYetevuSogOf49CO99MexciDcCdwRSY79cg5Ar92Zl3xzrcErmXWsJd72p9
AAdTZQKtTKih0k3YKtYBe0c4gMm8U8bfQ12RiVQPUJMnwYbOIZ3l/6omuKN458Hm
poxXU/aUN6KCNR/5UfGivKr8EVjjO8EvHj/txHCmiEz/YhM7dbHFBQdfCY/EWKap
IYUAiR4jIWhGYFS3dbwxhCZHTIPfIK3DtqvQBtU07wa1WSAkKKSMCgBHAKOlDwap
ZCVKLyezajjko28SugXGjegEjcY4o7v23XghhW6RAbEB6R8TZDo=
=Y5D8
-----END PGP SIGNATURE-----
\`\`\`
`;

export const Default: Story = {
  args: {
    trigger: <Button>Trigger</Button>,
    heading: 'Node v18.17.0',
    subheading: "2023-07-18, Version 18.17.0 'Hydrogen' (LTS), @danielleadams",
    avatars: names.map(name => ({
      src: getGitHubAvatarUrl(name),
      alt: name,
    })),
    children,
  },
  render: (_, { loaded: { Content } }) => Content,
  loaders: [
    async ({ args }) => {
      const { MDXContent } = await compileMDX(
        new VFile(args.children?.toString()),
        'md'
      );

      return {
        Content: (
          <ChangelogModal {...args}>
            <main>
              <MDXRenderer Component={MDXContent} />
            </main>
          </ChangelogModal>
        ),
      };
    },
  ],
};

export default { component: ChangelogModal } as Meta;
