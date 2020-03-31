---
layout: about.hbs
title: 워킹 그룹
---

# 핵심 워킹 그룹
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

Core Working Groups are created by the [Technical Steering Committee (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).

## 현재의 워킹 그룹

* [Streams](#addon-api)
* [Build](#benchmarking)
* [Diagnostics](#build)
* [i18n](#diagnostics)
* [Evangelism](#docker)
* [Docker](#evangelism)
* [Addon API](#i18n)
* [릴리스](#release)
* [Post-mortem](#security)
* [Release](#streams)

### [Streams](https://github.com/nodejs/nan)

핵심 워킹 그룹은 [핵심 기술 위원회 (TSC, Technical Steering Committee)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md)에서 만듭니다.

Responsibilities include:

* Maintaining the [NAN](https://github.com/nodejs/nan) GitHub repository, including code, issues and documentation.
* Maintaining the [addon-examples](https://github.com/nodejs/node-addon-examples) GitHub repository, including code, issues and documentation.
* Maintaining the C++ Addon API within the Node.js project, in subordination to the Node.js TSC.
* Maintaining the Addon documentation within the Node.js project, in subordination to the Node.js TSC.
* Maintaining the _nan_ package in npm, releasing new versions as appropriate.
* `readable-stream`의 버전이 Node.js에 포함되도록 권장합니다.

The current members can be found in their [README](https://github.com/nodejs/nan#collaborators).

### [Build](https://github.com/nodejs/benchmarking)

스트림 워킹 그룹은 Node.js와 npm 생태계에서 사용하는 Streams API를 지원하고 개선합니다. 오랜 시간 동안 여러 번 나타나는 문제를 어렵지 않은 방법으로 해결하는 API를 조합 가능하게 만들고 있습니다. 생태계에 요구사항에 따라 API를 개선할 것입니다. 다른 솔루션과의 상호운용성과 하위 호환성 및 이전 버전이 가장 중요합니다.

* 모든 대상 플랫폼에서 패키지를 만듭니다.
* 테스트를 수행합니다.

Responsibilities include:

* Identifying 1 or more benchmarks that reflect customer usage. Likely will need more than one to cover typical Node.js use cases including low-latency and high concurrency
* Working to get community consensus on the list chosen
* `async_wrap`과 `async_hooks`를 개량할 수 있도록 Core 팀과 협업합니다.
* OS 추적 시스템과의 통합을 유지보수하고 개선합니다.(예: ETW, LTTNG, dtrace)

### [Diagnostics](https://github.com/nodejs/build)

The Build Working Group's purpose is to create and maintain a distributed automation infrastructure.

Responsibilities include:

* 커뮤니티와 연관있는 Node.js 자료를 모두 번역합니다.
* 높은 품질로 번역하고 번역된 내용이 최신화되도록 번역 과정을 검토합니다.
* 언어별 소셜 미디어 채널을 관리합니다.
* 언어별 밋업 및 콘퍼런스의 Node.js 발표자를 추천합니다.

### [i18n](https://github.com/nodejs/diagnostics)

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

Responsibilities include:

* Collaborating with V8 to integrate `v8_inspector` into Node.js.
* Collaborating with V8 to integrate `trace_event` into Node.js.
* Collaborating with Core to refine `async_wrap` and `async_hooks`.
* Maintaining and improving OS trace system integration (e.g. ETW, LTTNG, dtrace).
* Documenting diagnostic capabilities and APIs in Node.js and its components.
* Exploring opportunities and gaps, discussing feature requests, and addressing conflicts in Node.js diagnostics.
* Fostering an ecosystem of diagnostics tools for Node.js.
* Defining and adding interfaces/APIs in order to allow dumps to be generated when needed.
* Defining and adding common structures to the dumps generated in order to support tools that want to introspect those dumps.

### [Evangelism](https://github.com/nodejs/docker-node)

Diagnostics 워킹 그룹의 목적은 Node.js 도구와 JavaScript VM에서 사용할 수 있는 광범위한 진단 인터페이스를 확장성있게 만들고 문서화하는 것입니다.

Responsibilities include:

* 프로젝트 메시징
* 공식 프로젝트 소셜 미디어
* 밋업과 콘퍼런스의 발표자 추천

### [Docker](https://github.com/nodejs/evangelism)

The Evangelism Working Group promotes the accomplishments of Node.js and lets the community know how they can get involved.

Responsibilities include:

* 새로운 Node.js 릴리스로 공식 Docker 이미지를 갱신합니다.
* 이미지의 개선이나 수정사항 구현을 결정합니다.
* 이미지 문서를 관리하고 개선합니다.
* Handling the promotion of community events.
* Publishing regular update summaries and other promotional content.

### [Addon API](https://github.com/nodejs/i18n)

각 팀은 공통으로 말하는 언어를 중심으로 조직되어 있습니다. 각 언어 커뮤니티는 다양한 프로젝트의 자원을 지역화할 것입니다.

Each team is organized around a common spoken language. Each language community might then produce multiple localizations for various project resources.

Responsibilities include:

* Translating any Node.js materials they believe are relevant to their community.
* [addon-examples](https://github.com/nodejs/node-addon-examples) GitHub 저장소에서 코드, 이슈, 문서를 관리합니다.
* Managing and monitoring social media channels in their language.
* Node.js TSC 하에 Node.js 프로젝트의 Addon 문서를 관리합니다.

Each language community maintains its own membership.

* [nodejs-ar - Arabic (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

### [릴리스](https://github.com/nodejs/Release)

언어별 커뮤니티는 개별 권한을 가지고 운영되고 있습니다.

Responsibilities include:

* 사용자 용도를 반역하는 하나 이상의 벤치마크를 확인합니다. 지연이 낮고 높은 동시성을 가지는 것을 포함해서 일반적인 Node 사용 사례를 다루는 하나 이상의 벤치마크가 필요합니다.
* 선택한 벤치마크 목록에서 커뮤니티의 합의를 합니다.
* Node 빌드에 선정한 벤치마크를 정기적으로 실행합니다.
* 빌드/릴리스 간에 성능을 추적하고 알립니다.
* Manage the Long Term Support and Current branches including backporting changes to these branches.
* Define the policy for what gets backported to release streams

### [Post-mortem](https://github.com/nodejs/security-wg)

에반젤리즘 워킹 그룹은 Node.js의 성과를 홍보하고 커뮤니티가 참여하는 방법을 알립니다.

Responsibilities include:

* Define and maintain security policies and procedures for:
  * the core Node.js project
  * other projects maintained by the Node.js Technical Steering Committee (TSC).
* Work with the Node Security Platform to bring community vulnerability data into the foundation as a shared asset.
* Ensure the vulnerability data is updated in an efficient and timely manner. For example, ensuring there are well-documented processes for reporting vulnerabilities in community modules.
* Review and recommend processes for handling of security reports (but not the actual administration of security reports, which are reviewed by a group of people directly delegated to by the TSC).
* Define and maintain policies and procedures for the coordination of security concerns within the external Node.js open source ecosystem.
* Offer help to npm package maintainers to fix high-impact security bugs.
* Maintain and make available data on disclosed security vulnerabilities in:
  * the core Node.js project
  * other projects maintained by the Node.js Foundation technical group
  * the external Node.js open source ecosystem
* Promote the improvement of security practices within the Node.js ecosystem.
* Recommend security improvements for the core Node.js project.
* Facilitate and promote the expansion of a healthy security service and product provider ecosystem.

### [Release](https://github.com/nodejs/readable-stream)

The Streams Working Group is dedicated to the support and improvement of the Streams API as used in Node.js and the npm ecosystem. We seek to create a composable API that solves the problem of representing multiple occurrences of an event over time in a humane, low-overhead fashion. Improvements to the API will be driven by the needs of the ecosystem; interoperability and backwards compatibility with other solutions and prior versions are paramount in importance.

Responsibilities include:

* 릴리스 프로세스를 정의합니다.
* 릴리스의 콘텐츠를 정의합니다.
* 릴리스를 생성합니다.
* 릴리스를 테스트합니다.
* LTS 및 현재 버전 브랜치를 관리하고 변경 사항을 백포트합니다.
* 어떤 사항을 백포트할지에 대한 정책을 정의합니다.
* Messaging about the future of streams to give the community advance notice of changes.
