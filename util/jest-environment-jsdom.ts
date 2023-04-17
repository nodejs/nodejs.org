'use strict';
import { TextEncoder, TextDecoder } from 'util';
import {
  default as $JSDOMEnvironment,
  TestEnvironment,
} from 'jest-environment-jsdom';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

class JSDOMEnvironment extends $JSDOMEnvironment {
  constructor(...args) {
    const { global } = super(...args);
    if (!global.TextEncoder) global.TextEncoder = TextEncoder;
    if (!global.TextDecoder) global.TextDecoder = TextDecoder;
  }
}

export default JSDOMEnvironment;
export { TestEnvironment };
