---
title: V8 JavaScript 엔진
layout: learn
authors: flaviocopes, smfoote, co16353sidak, MylesBorins, LaRuaNa, andys8, ahmadawais, karlhorky, aymen94
---

# V8 JavaScript 엔진

V8는 Google Chrome을 구동하는 JavaScript 엔진의 이름입니다. V8는 우리가 Chrome에서 브라우징할 때 JavaScript를 처리하고 실행하는 역할을 합니다.

V8는 JavaScript 엔진입니다. 즉, JavaScript 코드를 분석하고 실행합니다. DOM과 기타 웹 플랫폼 API(이들은 모두 런타임 환경을 구성합니다)는 브라우저가 제공합니다.

흥미로운 점은 JavaScript 엔진이 그 엔진을 호스팅하는 브라우저와는 독립적이라는 것입니다. 이 핵심 기능 덕분에 Node.js가 탄생할 수 있었습니다. 2009년에 Node.js를 구동하는 엔진으로 V8가 선택되었고, Node.js의 인기가 폭발적으로 증가함에 따라 V8는 현재 엄청난 양의 서버 사이드 JavaScript 코드를 구동하는 엔진이 되었습니다.

Node.js 생태계는 매우 방대하며, V8 덕분에 Electron과 같은 프로젝트를 통해 데스크탑 애플리케이션도 구동할 수 있게 되었습니다.

## 기타 JavaScript 엔진들

다른 브라우저들도 자신만의 JavaScript 엔진을 가지고 있습니다:

- Firefox는 [**SpiderMonkey**](https://spidermonkey.dev)를 가지고 있습니다.
- Safari는 [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore) (Nitro라고도 부름)을 사용합니다.
- Edge는 원래 [**Chakra**](https://github.com/Microsoft/ChakraCore)를 기반으로 했지만, 최근에는 [Chromium을 사용하여 재구축](https://support.microsoft.com/en-us/help/4501095/download-the-new-microsoft-edge-based-on-chromium)되었으며, V8 엔진을 사용하고 있습니다.

이 외에도 많은 엔진들이 존재합니다.

이 모든 엔진들은 [ECMA ES-262 표준](https://www.ecma-international.org/publications/standards/Ecma-262.htm), 즉 JavaScript에서 사용되는 ECMAScript 표준을 구현합니다.

## 성능을 향한 여정

V8는 C++로 작성되었으며, 지속적으로 개선되고 있습니다. V8는 이식 가능하며 Mac, Windows, Linux 및 여러 다른 시스템에서 실행됩니다.

이 V8 소개에서 우리는 V8의 구현 세부 사항을 무시할 것입니다. 이러한 세부 사항은 더 권위 있는 사이트(예: [V8 공식 사이트](https://v8.dev/))에서 확인할 수 있으며, 종종 급격하게 변화합니다.

V8는 다른 JavaScript 엔진들처럼 웹과 Node.js 생태계를 가속화하기 위해 항상 진화하고 있습니다.

웹에서는 성능 경쟁이 수년간 계속되어 왔으며, 우리(사용자와 개발자)는 이 경쟁 덕분에 매년 더 빠르고 최적화된 기계를 얻게 됩니다.

## 컴파일

JavaScript는 일반적으로 인터프리터 언어로 간주되지만, 현대 JavaScript 엔진은 단순히 JavaScript를 해석하는 것에 그치지 않고 이를 컴파일합니다.

이는 2009년 Firefox 3.5에 SpiderMonkey JavaScript 컴파일러가 추가되면서 시작되었고, 그 이후 모든 브라우저가 이 아이디어를 따르게 되었습니다.

JavaScript는 V8에 의해 **즉시 컴파일(Just-in-Time, JIT)** 방식으로 내부적으로 컴파일되어 실행 속도를 높입니다.

이것이 직관적이지 않게 들릴 수 있지만, 2004년 Google Maps 도입 이후 JavaScript는 일반적으로 몇십 줄의 코드를 실행하는 언어에서 브라우저 내에서 수천 줄에서 수십만 줄의 코드를 실행하는 완전한 애플리케이션으로 발전했습니다.

우리의 애플리케이션은 이제 단순한 폼 유효성 검사 규칙이나 간단한 스크립트 대신 브라우저 내에서 몇 시간 동안 실행될 수 있습니다.

이 *새로운 세계*에서는 JavaScript를 컴파일하는 것이 완벽한 의미를 가집니다. 왜냐하면 JavaScript를 *준비*하는 데 시간이 조금 더 걸리더라도, 한 번 완료되면 순수 해석된 코드보다 훨씬 더 성능이 뛰어나기 때문입니다.
