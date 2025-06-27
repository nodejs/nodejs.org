import type constants from '../util/download/constants.json';

// Extract OS key type from the systems object
export type OperatingSystem = keyof typeof constants.systems;

// Derive the union type of UserPlatform from the userOptions
export type Platform = (typeof constants.userOptions.platforms)[number];

// Derive the union type of UserBitness from the userOptions
export type Bitness = (typeof constants.userOptions.bitness)[number];

// Derive the union type of UserArchitecture from the userOptions
export type Architecture = (typeof constants.userOptions.architecture)[number];
