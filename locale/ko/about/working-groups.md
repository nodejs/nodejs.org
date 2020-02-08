---
layout: about.hbs
title: 워킹 그룹
---

<!--
# Core Working Groups
-->
<!-- Information here should mostly mirror: https://github.com/nodejs/node/blob/master/WORKING_GROUPS.md -->

# 핵심 워킹 그룹

<!--
Core Working Groups are created by the
[Technical Steering Committee (TSC)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md).
-->
핵심 워킹 그룹은
[핵심 기술 위원회 (TSC, Technical Steering Committee)](https://github.com/nodejs/TSC/blob/master/TSC-Charter.md)에서
만듭니다.

<!--
## Current Working Groups

* [Streams](#streams)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [i18n](#i18n)
* [Evangelism](#evangelism)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Release](#release)
-->

## 현재의 워킹 그룹

* [Streams](#streams)
* [Build](#build)
* [Diagnostics](#diagnostics)
* [i18n](#i18n)
* [Evangelism](#evangelism)
* [Docker](#docker)
* [Addon API](#addon-api)
* [Benchmarking](#benchmarking)
* [Post-mortem](#post-mortem)
* [Release](#release)

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

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

### [i18n](https://github.com/nodejs/i18n)

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

* 커뮤니티와 연관있는 Node.js 자료를 모두 번역합니다.
* 높은 품질로 번역하고 번역된 내용이 최신화되도록 번역 과정을 검토합니다.
* 언어별 소셜 미디어 채널을 관리합니다.
* 언어별 밋업 및 콘퍼런스의 Node.js 발표자를 추천합니다.

<!--
Each language community maintains its own membership.

* [nodejs-ar - Arabic (اللغة العربية)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български език)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
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
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
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

언어별 커뮤니티는 개별 권한을 가지고 운영되고 있습니다.

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

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

Responsibilities include:
* Maintaining the [NAN](https://github.com/nodejs/nan) GitHub repository,
  including code, issues and documentation.
* Maintaining the [addon-examples](https://github.com/nodejs/node-addon-examples)
  GitHub repository, including code, issues and documentation.
* Maintaining the C++ Addon API within the Node.js project, in subordination to
  the Node.js TSC.
* Maintaining the Addon documentation within the Node.js project, in
  subordination to the Node.js TSC.
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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

* [NAN](https://github.com/nodejs/nan) GitHub 저장소에서 코드, 이슈, 문서를 관리합니다.
* [addon-examples](https://github.com/nodejs/node-addon-examples)
  GitHub 저장소에서 코드, 이슈, 문서를 관리합니다.
* Node.js TSC 하에 Node.js 프로젝트의 C++ Addon API를 관리합니다.
* Node.js TSC 하에 Node.js 프로젝트의 Addon 문서를 관리합니다.
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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

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

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

* 필요할 때 덤프를 생성할 수 있도록 인터페이스/API를 정의하고 추가합니다.
* 이러한 덤프를 분석하는 도구를 지원하기 위해 생성된 덤프의 공통 구조를 정의하고 추가합니다.

<!--
### [Release](https://github.com/nodejs/Release)

The Release Working Group manages the release process for Node.js.

Responsibilities include:
* Define the release process.
* Define the content of releases.
* Generate and create releases.
* Test Releases.
* Manage the Long Term Support and Current branches including
  backporting changes to these branches.
* Define the policy for what gets backported to release streams
-->

### [Release](https://github.com/nodejs/Release)

릴리스 워킹 그룹은 Node.js의 릴리스 프로세스를 관리합니다.

이 워킹 그룹은 다음과 같은 업무를 담당합니다.

* 릴리스 프로세스를 정의합니다.
* 릴리스의 콘텐츠를 정의합니다.
* 릴리스를 생성합니다.
* 릴리스를 테스트합니다.
* LTS 및 현재 버전 브랜치를 관리하고 변경 사항을 백포트합니다.
* 어떤 사항을 백포트할지에 대한 정책을 정의합니다.
