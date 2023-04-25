import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom/extend-expect';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
