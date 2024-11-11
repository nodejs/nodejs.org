---
title: Node.js와 WebAssembly
layout: learn
authors: lancemccluskey, ovflowd
---

# Node.js와 WebAssembly

**[WebAssembly](https://webassembly.org)** 는 C/C++, Rust, AssemblyScript를 포함한 다양한 언어에서 컴파일할 수 있는 고성능 어셈블리와 유사한 언어입니다. 현재 Chrome, Firefox, Safari, Edge 및 Node.js에서 지원됩니다!

WebAssembly 사양은 `.wasm` 확장자를 가진 이진 형식의 WebAssembly 모듈과 `.wat` 확장자를 가진 해당 텍스트 표현 형식 두 가지 파일 형식을 자세히 설명합니다.

## 주요 개념

- 모듈 (Module) - 컴파일된 WebAssembly 이진 파일, 즉 `.wasm` 파일입니다.
- 메모리 (Memory) - 크기를 조절할 수 있는 ArrayBuffer입니다.
- 테이블 (Table) - 메모리에 저장되지 않는 참조의 크기를 조절할 수 있는 타입 배열입니다.
- 인스턴스 (Instance) - 메모리, 테이블 및 변수와 함께 모듈을 인스턴스화한 것입니다.

WebAssembly를 사용하려면 `.wasm` 이진 파일과 WebAssembly와 통신하기 위한 API 세트가 필요합니다. Node.js는 전역 `WebAssembly` 객체를 통해 필요한 API를 제공합니다.

```js
console.log(WebAssembly);
/*
Object [WebAssembly] {
  compile: [Function: compile],
  validate: [Function: validate],
  instantiate: [Function: instantiate]
}
*/
```

## WebAssembly 모듈 생성하기

WebAssembly 이진 파일을 생성하는 방법에는 여러 가지가 있습니다:

- WebAssembly(`.wat`)를 수동으로 작성하고 [wabt](https://github.com/webassembly/wabt)와 같은 도구를 사용하여 이진 형식으로 변환하기
- C/C++ 애플리케이션에 [emscripten](https://emscripten.org/) 사용하기
- Rust 애플리케이션에 [wasm-pack](https://rustwasm.github.io/wasm-pack/book/) 사용하기
- TypeScript와 유사한 경험을 원할 경우 [AssemblyScript](https://www.assemblyscript.org/) 사용하기

> 이러한 도구 중 일부는 이진 파일뿐만 아니라 브라우저에서 실행할 수 있는 JavaScript "글루" 코드와 해당 HTML 파일도 생성합니다.

## 사용 방법

WebAssembly 모듈이 준비되면 Node.js의 `WebAssembly` 객체를 사용하여 이를 인스턴스화할 수 있습니다.

```js
// add.wasm 파일이 있으며, 제공된 두 인자를 더하는 단일 함수가 포함되어 있다고 가정합니다.
const fs = require('node:fs');

const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  // 내보내기된 함수는 instance.exports 아래에 존재합니다.
  const { add } = wasmModule.instance.exports;
  const sum = add(5, 6);
  console.log(sum); // 출력: 11
});
```

## OS와 상호작용하기

WebAssembly 모듈은 자체적으로 OS 기능에 직접 접근할 수 없습니다. 이러한 기능에 접근하기 위해서는 [Wasmtime](https://docs.wasmtime.dev/)라는 서드파티 도구를 사용할 수 있습니다. `Wasmtime`는 OS 기능에 접근하기 위해 [WASI](https://wasi.dev/) API를 활용합니다.

## 리소스

- [WebAssembly 일반 정보](https://webassembly.org/)
- [MDN 문서](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly를 수동으로 작성하기](https://webassembly.github.io/spec/core/text/index.html)
