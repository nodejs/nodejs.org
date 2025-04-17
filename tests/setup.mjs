import { register } from 'node:module';
import { afterEach } from 'node:test';
import { cleanup } from '@testing-library/react';

register('./loader.mjs', import.meta.url);

afterEach(cleanup);

global.Event = window.Event;
global.CustomEvent = window.CustomEvent;
