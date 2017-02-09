---
layout: about.hbs
title: 워킹 그룹
---
<!--
# Working Groups
There are 2 types of Working Groups:
* [Top-Level Working Groups](#top-level-working-groups)
* [Core Working Groups](#core-working-groups)
-->

# 워킹 그룹
2가지 종류의 워킹 그룹이 있습니다.
* [최상위 워킹 그룹](#top-level-working-groups)
* [핵심 워킹 그룹](#core-working-groups)

<!--
# Top-Level Working Groups
-->
<!-- Information here should mostly mirror: https://github.com/nodejs/TSC/blob/master/WORKING_GROUPS.md -->

# 최상위 워킹 그룹

<!--
Top-Level Working Groups are created by the
[Technical Steering Committee (TSC)](https://github.com/nodejs/TSC#top-level-wgs-and-tlps).
-->
최상위 워킹 그룹은 [기술 결정 위원회(TSC)](https://github.com/nodejs/TSC#top-level-wgs-and-tlps)에서 만듭니다.

<!--
## Current Top-Level Working Groups
* [Inclusivity](#inclusivity)
-->

## 현재의 최상위 워킹 그룹
* [Inclusivity](#inclusivity)

<!--
#### [Inclusivity](https://github.com/nodejs/inclusivity)
The Inclusivity Working Group seeks to increase inclusivity and diversity for
the Node.js project:
-->

#### [Inclusivity](https://github.com/nodejs/inclusivity)
Inclusivity 워킹 그룹은 Node.js 프로젝트의 포괄성과 다양성을 높이는 작업을 합니다.

<!--
* Increasing inclusivity means making the Node.js project a safe and friendly
place for people from diverse backgrounds.
* Increasing diversity means actively onboarding people from diverse backgrounds
to the Node.js project and maintaining their participation.
-->

* 포괄성을 높인다는 것은 다양한 배경을 가진 사람들한테 Node.js 프로젝트를 안전하고 친숙한 곳으로
  만든다는 것을 의미합니다.
* 다양성을 높인다는 것은 다양한 배경을 가진 사람들이 활발하게 Node.js 프로젝트에 합류하고
  이들의 참여를 관리하는 것을 의미합니다.

<!--
Responsibilities include:
* Fostering a welcoming environment that ensures participants are valued and can
feel confident contributing or joining discussions, regardless of any [aspect of
their identity](https://github.com/nodejs/inclusivity/#list-of-responsibilities).
* Proactively seeking and proposing concrete steps the project can take to increase
inclusivity.
* Serving as a resource for the development and enforcement of workflows that
protect community members and projects from harassment and abuse.
* Acknowledging and celebrating existing diversity accomplishments within the project
while seeking to build upon them.
* Identifying ways to measure diversity and inclusivity within the project and report
them at regular intervals.
-->

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* [신분에 따른 관점](https://github.com/nodejs/inclusivity/#list-of-responsibilities)에
  상관없이 참여의 가치를 인정하고 자신 있게 기여하고 논의에 참여할 수 있도록 환영하는 환경을 추구합니다.
* 프로젝트 포괄성을 키울 수 있는 확실한 방법을 적극적으로 찾고 제안합니다.
* 희롱이나 욕설에서 커뮤니티 멤버와 프로젝트를 보호하는 작업 흐름의 개발과 시행에 대한 리소스로서
  제공합니다.
* 프로젝트 내에 다양성을 이룬 것을 인정하고 축하하면서 이 다양성 위에서 방법을 모색합니다.
* 프로젝트 내의 다양성과 포괄성을 평가하고 이를 정기적으로 보고하는 방법을 결정합니다.

<!--
# Core Working Groups
-->
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

# 핵심 워킹 그룹

<!--
Core Working Groups are created by the
[Core Technical Committee (CTC)](https://github.com/nodejs/node/blob/master/GOVERNANCE.md#core-technical-committee).
-->
핵심 워킹 그룹은
[핵심 기술 위원회 (CTC, Core Technical Committee)](https://github.com/nodejs/node/blob/master/GOVERNANCE.md#core-technical-committee)에서
만듭니다.

<!--
## Current Working Groups

* [Website](#website)
* [Streams](#streams)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [i18n](#i18n)
* [Evangelism](#evangelism)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Intl](#intl)
* [Documentation](#documentation)
* [Testing](#testing)
-->

## 현재의 워킹 그룹

* [Website](#website)
* [Streams](#streams)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [i18n](#i18n)
* [Evangelism](#evangelism)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Intl](#intl)
* [Documentation](#documentation)
* [Testing](#testing)

<!--
### [Website](https://github.com/nodejs/nodejs.org)

The Website Working Group's purpose is to build and maintain a public
website for the Node.js project.

Responsibilities include:
* Developing and maintaining a build and automation system for nodejs.org.
* Ensuring the site is regularly updated with changes made to Node.js, like
  releases and features.
* Fostering and enabling a community of translators.
-->

### [Website](https://github.com/nodejs/nodejs.org)

웹사이트 워킹그룹의 목적은 Node.js 프로젝트의 공개 웹사이트를 만들고 관리하는 것입니다.

이는 다음에 대한 책임이 있습니다.
* nodejs.org의 빌드와 자동화 시스템을 개발하고 유지 보수합니다.
* 릴리스와 기능처럼 Node.js에 변경된 내용을 정기적으로 사이트에 갱신합니다.
* 번역 커뮤니티를 지원합니다.

<!--
### [Streams](https://github.com/nodejs/readable-stream)

The Streams Working Group is dedicated to the support and improvement of the
Streams API as used in Node.js and the npm ecosystem. We seek to create a
composable API that solves the problem of representing multiple occurrences
of an event over time in a humane, low-overhead fashion. Improvements to the
API will be driven by the needs of the ecosystem; interoperability and
backwards compatibility with other solutions and prior versions are paramount
in importance.

Responsibilities include:
* Addressing stream issues on the Node.js issue tracker.
* Authoring and editing stream documentation within the Node.js project.
* Reviewing changes to stream subclasses within the Node.js project.
* Redirecting changes to streams from the Node.js project to this project.
* Assisting in the implementation of stream providers within Node.js.
* Recommending versions of `readable-stream` to be included in Node.js.
* Messaging about the future of streams to give the community advance notice of changes.
-->

### [Streams](https://github.com/nodejs/readable-stream)

스트림 워킹 그룹은 Node.js와 npm 생태계에서 사용하는 Streams API를 지원하고 개선합니다.
오랜 시간 동안 여러 번 나타나는 문제를 어렵지 않은 방법으로 해결하는 API를 조합 가능하게 만들고
있습니다. 생태계에 요구사항에 따라 API를 개선할 것입니다. 다른 솔루션과의 상호운용성과 하위 호환성 및
이전 버전이 가장 중요합니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* Node.js 이슈 트래커에서 스트림 관련 이슈를 처리합니다.
* Node.js 프로젝트 내 스트림 문서를 작성하고 수정합니다.
* Node.js 프로젝트 내 스트림 하위 클래스의 변경사항을 리뷰합니다.
* 스트림 변경사항을 Node.js 프로젝트에서 이 프로젝트로 리다이렉트합니다.
* Node.js 내 스트림 프로바이더의 구현체를 지원합니다.
* `readable-stream`의 버전이 Node.js에 포함되도록 권장합니다.
* 차후 스트림의 변경사항을 커뮤니티에 알립니다.

<!--
### [Build](https://github.com/nodejs/build)

The Build Working Group's purpose is to create and maintain a distributed
automation infrastructure.

Responsibilities include:
* Producing packages for all target platforms.
* Running tests.
* Running performance testing and comparisons.
* Creating and managing build-containers.
-->

### [Build](https://github.com/nodejs/build)

빌드 워킹 그룹의 목적은 분산 자동화 인프라스트럭처를 만들고 유지 보수하는 것입니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 모든 대상 플랫폼에서 패키지를 만듭니다.
* 테스트를 수행합니다.
* 성능테스트를 수행하고 비교합니다.
* 빌드 컨테이너를 생성하고 관리합니다.

<!--
### [Diagnostics](https://github.com/nodejs/diagnostics)

The Diagnostics Working Group's purpose is to surface a set of comprehensive,
documented, and extensible diagnostic interfaces for use by Node.js tools and
JavaScript VMs.

Responsibilities include:
* Collaborating with V8 to integrate `v8_inspector` into Node.js.
* Collaborating with V8 to integrate `trace_event` into Node.js.
* Collaborating with Core to refine `async_wrap` and `async_hooks`.
* Maintaining and improving OS trace system integration (e.g. ETW, LTTNG, dtrace).
* Documenting diagnostic capabilities and APIs in Node.js and its components.
* Exploring opportunities and gaps, discussing feature requests, and addressing
  conflicts in Node.js diagnostics.
* Fostering an ecosystem of diagnostics tools for Node.js.
-->

### [Diagnostics](https://github.com/nodejs/diagnostics)

Diagnostics 워킹 그룹의 목적은 Node.js 도구와 JavaScript VM에서 사용할 수 있는
광범위한 진단 인터페이스를 확장성있게 만들고 문서화하는 것입니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* `v8_inspector`를 Node.js에 통합하도록 V8과 협업합니다.
* `trace_event`를 Node.js에 통합하도록 V8과 협업합니다.
* `async_wrap`과 `async_hooks`를 개량할 수 있도록 Core 팀과 협업합니다.
* OS 추적 시스템과의 통합을 유지보수하고 개선합니다.(예: ETW, LTTNG, dtrace)
* Node.js와 컴포넌트의 진단 기능과 API의 문서화를 진행합니다.
* Node.js 진단에 관한 기회와 틈새를 찾고 기능 요청에 대해 논의하고 충돌을 중재합니다.
* Node.js의 진단 도구 생태계를 지원합니다.

<!--
### i18n

The i18n Working Groups handle more than just translations. They
are endpoints for community members to collaborate with each
other in their language of choice.

Each team is organized around a common spoken language. Each
language community might then produce multiple localizations for
various project resources.
-->

### i18n

i18n 워킹 그룹은 단순 번역 이상의 작업을 수행합니다. 이 워킹 그룹은 커뮤니티 회원들이 각자의 언어로
협업할 수 있도록 하는 종점입니다.

각 팀은 공통으로 말하는 언어를 중심으로 조직되어 있습니다. 각 언어 커뮤니티는
다양한 프로젝트의 자원을 지역화할 것입니다.

<!--
Responsibilities include:
* Translating any Node.js materials they believe are relevant to their
  community.
* Reviewing processes for keeping translations up to date and of high quality.
* Managing and monitoring social media channels in their language.
* Promoting Node.js speakers for meetups and conferences in their language.
-->

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 커뮤니티와 연관있는 Node.js 자료를 모두 번역합니다.
* 높은 품질로 번역하고 번역된 내용이 최신화되도록 번역 과정을 검토합니다.
* 언어별 소셜 미디어 채널을 관리합니다.
* 언어별 밋업 및 콘퍼런스의 node.js 발표자를 추천합니다.

<!--
Note that the i18n Working Groups are distinct from the [Intl](#Intl) Working Group.

Each language community maintains its own membership.

* [nodejs-ar - Arabic (اللغة العربية)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български език)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Český Jazyk)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (फिजी बात)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Mакедонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (Hō-ló)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việtnam)](https://github.com/nodejs/nodejs-vi)
-->

i18n 워킹 그룹은 [Intl](#Intl) 워킹 그룹과는 다릅니다.

언어별 커뮤니티는 개별 권한을 가지고 운영되고 있습니다.

* [nodejs-ar - Arabic (اللغة العربية)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български език)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Český Jazyk)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (फिजी बात)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Mакедонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (Hō-ló)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việtnam)](https://github.com/nodejs/nodejs-vi)

<!--
### [Intl](https://github.com/nodejs/Intl)

The Intl Working Group is dedicated to support and improvement of
Internationalization (i18n) and Localization (l10n) in Node.

Responsibilities include:
* Ensuring functionality & compliance (standards: ECMA, Unicode…)
* Supporting Globalization and Internationalization issues that come up
  in the tracker
* Communicating guidance and best practices
* Refining the existing `Intl` implementation

The Intl Working Group is not responsible for translation of content. That is the
responsibility of the specific [i18n](#i18n) group for each language.
-->

### [Intl](https://github.com/nodejs/Intl)

Intl 워킹 그룹은 Node의 국제화(i18n)와 지역화(l10n)를 지원하고 개선합니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 모든 기능과 표준 준수 (표준: ECMA, 유니코드...)
* 트래커에 올라온 세계화(Globalization)와 국제화(Internationalization) 이슈를 지원합니다.
* 가이드라인과 권장 사례를 만듭니다.
* 기존의 `Intl` 구현체를 정제합니다.

Intl 워킹 그룹은 콘텐츠의 번역은 책임지지 않습니다.
이는 각 언어에 대한 [i18n](#i18n)에 책임이 있습니다.

<!--
### [Evangelism](https://github.com/nodejs/evangelism)

The Evangelism Working Group promotes the accomplishments
of Node.js and lets the community know how they can get involved.

Responsibilities include:
* Facilitating project messaging.
* Managing official project social media.
* Handling the promotion of speakers for meetups and conferences.
* Handling the promotion of community events.
* Publishing regular update summaries and other promotional
  content.
-->

### [Evangelism](https://github.com/nodejs/evangelism)

에반젤리즘 워킹 그룹은 Node.js의 성과를 홍보하고 커뮤니티가 참여하는 방법을 알립니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 프로젝트 메시징
* 공식 프로젝트 소셜 미디어
* 밋업과 콘퍼런스의 발표자 추천
* 커뮤니티 이벤트의 홍보
* 정기적인 수정사항 요약과 다른 홍보 내용의 발행

<!--
### [Docker](https://github.com/nodejs/docker-node)

The Docker Working Group's purpose is to build, maintain, and improve official
Docker images for the Node.js project.

Responsibilities include:
* Keeping the official Docker images updated in line with new Node.js releases.
* Decide and implement image improvements and/or fixes.
* Maintain and improve the images' documentation.
-->

### [Docker](https://github.com/nodejs/docker-node)

Docker 워킹 그룹은 Node.js 프로젝트의 공식 Docker 이미지를 만들고 관리하고 개선합니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 새로운 Node.js 릴리스로 공식 Docker 이미지를 갱신합니다.
* 이미지의 개선이나 수정사항 구현을 결정합니다.
* 이미지 문서를 관리하고 개선합니다.

<!--
### [Addon API](https://github.com/nodejs/nan)

The Addon API Working Group is responsible for maintaining the NAN project and
corresponding _nan_ package in npm. The NAN project makes available an
abstraction layer for native add-on authors for Node.js,
assisting in the writing of code that is compatible with many actively used
versions of Node.js, V8 and libuv.

Responsibilities include
* Maintaining the [NAN](https://github.com/nodejs/nan) GitHub repository,
  including code, issues and documentation.
* Maintaining the [addon-examples](https://github.com/nodejs/node-addon-examples)
  GitHub repository, including code, issues and documentation.
* Maintaining the C++ Addon API within the Node.js project, in subordination to
  the Node.js CTC.
* Maintaining the Addon documentation within the Node.js project, in
  subordination to the Node.js CTC.
* Maintaining the _nan_ package in npm, releasing new versions as appropriate.
* Messaging about the future of the Node.js and NAN interface to give the
  community advance notice of changes.

The current members can be found in their
[README](https://github.com/nodejs/nan#collaborators).
-->

### [Addon API](https://github.com/nodejs/nan)

애드온 API 워킹 그룹은 NAN 프로젝트와 npm에서 _nan_ 패키지를 유지 보수하는 책임을 집니다.
NAN 프로젝트는 네이티브 애드온 작성자가 다수가 사용하는 Node.js, V8, libuv 버전과 호환성 있는
코드를 작성할 수 있도록 추상화 계층을 제공한다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* [NAN](https://github.com/nodejs/nan) GitHub 저장소에서 코드, 이슈, 문서를 관리합니다.
* [addon-examples](https://github.com/nodejs/node-addon-examples)
  GitHub 저장에서 코드, 이슈, 문서를 관리합니다.
* Node.js CTC 하에 Node.js 프로젝트의 C++ Addon API를 관리합니다.
* Node.js CTC 하에 Node.js 프로젝트의 Addon 문서를 관리합니다.
* npm의 _nan_ 패키지를 관리하고 절절하게 새로운 버전을 릴리스합니다.
* 차후 Node.js와 NAN 인터페이스의 변경사항을 커뮤니티에 알립니다.

현재 회원은 nan의 [README](https://github.com/nodejs/nan#collaborators)에서
볼 수 있습니다.

<!--
### [Benchmarking](https://github.com/nodejs/benchmarking)

The purpose of the Benchmark Working Group is to gain consensus
on an agreed set of benchmarks that can be used to:

* track and evangelize performance gains made between Node.js releases
* avoid performance regressions between releases

Responsibilities include:
* Identifying 1 or more benchmarks that reflect customer usage.
  Likely will need more than one to cover typical Node.js use cases
  including low-latency and high concurrency
* Working to get community consensus on the list chosen
* Adding regular execution of chosen benchmarks to Node.js builds
* Tracking/publicizing performance between builds/releases
-->

### [Benchmarking](https://github.com/nodejs/benchmarking)

벤치마킹 워킹 그룹의 목적은 벤치마크 세트가 동의하에 사용될 수 있도록 합의점을 찾는 것입니다.

* Node 릴리스 간의 성능 차이를 추적하고 알립니다.
* 릴리즈 간의 성능 저하를 피합니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 사용자 용도를 반역하는 하나 이상의 벤치마크를 확인합니다. 지연이 낮고 높은 동시성을 가지는 것을 포함해서 일반적인 Node 사용 사례를 다루는 하나 이상의 벤치마크가 필요합니다.
* 선택한 벤치마크 목록에서 커뮤니티의 합의를 합니다.
* Node 빌드에 선정한 벤치마크를 정기적으로 실행합니다.
* 빌드/릴리스 간에 성능을 추적하고 알립니다.

<!--
### [Post-mortem](https://github.com/nodejs/post-mortem)

The Post-mortem Diagnostics Working Group is dedicated to the support
and improvement of postmortem debugging for Node.js. It seeks to
elevate the role of postmortem debugging for Node, to assist in the
development of techniques and tools, and to make techniques and tools
known and available to Node.js users.

Responsibilities include:
* Defining and adding interfaces/APIs in order to allow dumps
  to be generated when needed.
* Defining and adding common structures to the dumps generated
  in order to support tools that want to introspect those dumps.
-->

### [Post-mortem](https://github.com/nodejs/post-mortem)

포스트모템 진단 워킹 그룹은 Node.js 포스트모템 디버깅을 지원하고 개선합니다. 이 워킹 그룹은 Node에서
포스트모템 디버깅의 역할을 향상시켜서 기술과 도구개발을 돕고 Node.js 사용자가 알고 있고 사용하는
기술과 도구를 만드는 것입니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 필요할 때 덤프를 생성할 수 있도록 인터페이스/API를 정의하고 추가합니다.
* 이러한 덤프를 분석하는 도구를 지원하기 위해 생성된 덤프의 공통 구조를 정의하고 추가합니다.

<!--
### [Documentation](https://github.com/nodejs/docs)

The Documentation Working Group exists to support the improvement of Node.js
documentation, both in the core API documentation, and elsewhere, such as the
Node.js website. Its intent is to work closely with the Evangelism, Website, and
Intl Working Groups to make excellent documentation available and accessible
to all.

Responsibilities include:
* Defining and maintaining documentation style and content standards.
* Producing documentation in a format acceptable for the Website Working Group
  to consume.
* Ensuring that Node's documentation addresses a wide variety of audiences.
* Creating and operating a process for documentation review that produces
  quality documentation and avoids impeding the progress of Core work.
-->

### [Documentation](https://github.com/nodejs/docs)

문서화 워킹 그룹은 코어 API 문서와 Node.js 웹사이트 같은 문서를 포함한 모든 Node.js 문서를 개선합니다. 모두가 뛰어난 문서를 사용할 수 있도록 Evangelism, Website, Intl 워킹 그룹과 밀접하게 작업합니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 문서 형식과 콘텐츠 표준을 정의하고 관리합니다.
* Website 워킹그룹이 받아들일 수 있는 형식으로 문서를 작성합니다.
* Node의 문서가 다양한 사용자를 지원할 수 있도록 합니다.
* 핵심 작업 절차를 방해하지 않고 질 좋은 문서를 만들기 위해 문서 리뷰과정을 만들고 운영합니다.

<!--
### [Testing](https://github.com/nodejs/testing)

The Node.js Testing Working Group's purpose is to extend and improve testing of
the Node.js source code.

Responsibilities include:
* Coordinating an overall strategy for improving testing.
* Documenting guidelines around tests.
* Working with the Build Working Group to improve continuous integration.
* Improving tooling for testing.
-->

### [Testing](https://github.com/nodejs/testing)

Node.js 테스팅 워킹 그룹은 Node.js 소스 코드의 테스트를 확장하고 개선합니다.

이 워킹 그룹은 다음에 대한 책임이 있습니다.
* 테스트를 개선하는 전반적인 전략을 조정합니다.
* 테스트와 관련된 가이드라인을 문서로 만듭니다.
* 지속적인 통합을 개선하기 위해 Build 워킹 그룹과 협업합니다.
* 테스트 도구를 개선합니다.
