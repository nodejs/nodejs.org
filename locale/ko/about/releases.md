---
layout: about.hbs
title: 릴리스
---
<!--
# Releases

The core team defines the roadmap's scope, as informed by Node.js' community.
Releases happen as often as necessary and practical, but never before work is
complete. Bugs are unavoidable, but pressure to ship a release will never
prevail over ensuring the software is correct. The commitment to quality
software is a core tenet of the Node.js project.
-->
# 릴리스

Node.js 커뮤니티가 알고 있듯이 코어 팀은 로드맵의 범위를 정의합니다. 필요하고 실용적이라면 최대한
자주 릴리스를 하지만 작업이 완료되지 않으면 하지 않습니다. 버그는 보이지 않을 수 있지만, 릴리스에 대한
압박은 소프트웨어가 제대로 되었다고 확신을 넘어설 수 없습니다.
소프트웨어의 질에 대한 책임은 Node.js 프로젝트의 핵심 신조입니다.

<!--
## Patches

Patch releases:

- Include bug, performance, and security fixes.
- Do not add nor change public interfaces.
- Do not alter the expected behavior of a given interface.
- Can correct behavior if it is out-of-sync with the documentation.
- Do not introduce changes which make seamless upgrades impossible.
-->

## 패치

패치 릴리스는

- 버그, 성능, 보안 수정을 포함합니다.
- 공개 인터페이스를 추가하거나 변경하지 않습니다.
- 제공한 인터페이스에서 기대되는 동작을 변경하지 않습니다.
- 문서와 일치하지 않다면 제대로 동작하도록 할 수 있습니다.
- 자연스럽게 업그레이드할 수 없는 변경사항을 추가하지 않습니다.

<!--
## Minors

Minor releases:

- Include additions and/or refinements of APIs and subsystems.
- Do not generally change APIs nor introduce backwards-incompatible breaking
changes, except where unavoidable.
- Are mostly additive releases.
-->

## 마이너

마이너 릴리스는

- API와 서브시스템의 추가나 개선을 포함합니다.
- 보통 API를 변경하지 않고 불가피하지 않은 경우를 제외하고는 하위호환성을 깨뜨리는 변경사항을 추가하지 않습니다.
- 대부분 부가적인 릴리스입니다.

<!--
## Majors

Major releases:

- Usually introduce backwards-incompatible, breaking changes.
- Identify the API Node.js intends to support for the foreseeable future.
- Require conversation, care, collaboration and appropriate scoping by the team
and its users.
-->

## 메이저

메이저 릴리스는

- 보통 하위호환성을 깨뜨리는 변경사항을 추가합니다.
- Node.js가 예견할 수 있는 미래를 준비할 수 있도록 API를 식별합니다.
- 코어 팀과 사용자들의 대화, 관심, 협업, 적당한 범위 설정이 필요합니다.

<!--
## Scoping Features

The team can add features and APIs into Node.js when:

- The need is clear.
- The API or feature has known consumers.
- The API is clean, useful, and easy-to use.

If when implementing core functionality for Node.js, the team or community may
identify another lower-level API which could have utility beyond Node.js. When
identified, Node.js can expose it for consumers.
-->

## 기능의 범위 정하기

코어 팀은 다음에서 Node.js에 기능이나 API를 추가할 수 있습니다.

- 요구사항이 확실할 때
- API나 기능이 알려진 사용자를 가질 때
- API가 깔끔하고 유용하면서 사용하기 쉬울 때

<!--
For example, consider the [`EventEmitter`] interface.  The need to have an event
subscription model for core modules to consume was clear, and that abstraction
had utility beyond the Node.js core.  It was not the case that its interface
couldn't be implemented externally to Node.js; instead, Node.js needed the
abstraction for itself, and also exposed it for use by Node.js consumers.

Alternatively, it may be that many in the community adopt a pattern to handle
common needs which Node.js does not satisfy.  It may be clear that Node.js
should deliver, by default, an API or feature for all Node.js consumers.
Another possibility is a commonly-used compiled asset which is difficult to
deliver across environments.  Given this, Node.js may incorporate those changes
directly.

The core team does not take the decision lightly to add a new API to Node.js.
Node.js has a strong commitment to backwards compatibility. As such, community
input and conversation must occur before the team takes action. Even if an API
is otherwise suitable for addition, the team must identify potential consumers.
-->
예를 들어, [`EventEmitter`] 인터페이스를 생각해 보겠습니다. 코어 모듈에서 사용할 수 있는
이벤트 구독 모델이 필요하다는 것은 했고 이 추상화는 Node.js 코어의 범위를 벗어나는 유틸리티를 가집니다.
이는 이 추상화의 인터페이스가 Node.js 외부에서 구현될 수 없는 경우가 아닙니다. 오히려 Node.js가
직접 추상화할 필요가 있었고 Node.js 사용자가 사용할 수 있도록 이를 노출해야 했습니다.

아니면 Node.js가 만족하게 하지 못하는 일반적인 요구사항을 해결하는 패턴을 커뮤니티의 다수가 도입할
수도 있습니다. Node.js가 모든 Node.js 사용자를 위한 API나 기능을 기본적으로 제공하는 것이
더 명확할 수도 있습니다. 여러 환경을 지원하기 어렵지만, 일반적으로 사용되는 에셋을 컴파일해서 제공하는
것도 가능합니다. 이러한 상황을 고려하면 Node.js가 직접 이러한 변경사항을 받아들여야 할 수도 있습니다.

코어 팀은 새로운 API를 Node.js에 추가할 때 가볍게 결정하지 않습니다. Node.js는 하위호환성을
지원해야 하는 큰 의무가 있습니다. 그래서 코어 팀이 행동을 취하기 전에 커뮤니티의 요청이나 토론이
반드시 먼저 일어나게 됩니다. API를 추가하는 것이 적합한 경우조차도 코어 팀은 잠재적인 사용자를
확인해야 합니다.

<!--
## Deprecation

On occasion, the team must deprecate a feature or API of Node.js. Before coming
to any final conclusion, the team must identify the consumers of the API and how
they use it.  Some questions to ask are:

- If this API is widely used by the community, what is the need for flagging it
as deprecated?
- Do we have a replacement API, or is there a transitionary path?
- How long does the API remain deprecated before removal?
- Does an external module exist which its consumers can easily substitute?

The team takes the same careful consideration when deprecating a Node.js API as
they do when adding another.

[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
-->

## 폐기 예정

때때로 코어 팀은 Node.js의 기능이나 API를 폐기해야 합니다. 최종 결정을 하기 전에 코어 팀은 API의 사용자와 이들이 그 API를 어떻게 사용하고 있는지를 반드시 확인해야 합니다. 이때 다음과 같은 질문을 해봐야 합니다.

- 커뮤니티에서 이 API를 광범위하게 사용하고 있다면 폐기 예정으로 표시하는 데 필요한 일은 어떤 것인가?
- 대체 API가 있는가? 아니면 과도기적인 경로가 존재하는가?
- API를 제거하기 전에 폐기 예정을 얼마나 오랫동안 유지해야 하는가?
- 그 API의 사용자가 쉽게 대체할 수 있는 외부 모듈이 존재하는가?

코어 팀은 Node.js API를 폐기할 때 API를 추가할 때와 마찬가지로 신중하게 고려합니다.

[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
