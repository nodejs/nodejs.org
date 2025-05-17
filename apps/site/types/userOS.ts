import type constants from '../util/downloadUtils/constants.json';

// Extract OS key type from the systems object
export type UserOS = keyof typeof constants.systems;

// Derive the union type of UserPlatform from the userOptions
export type UserPlatform = (typeof constants.userOptions.platforms)[number];

// Derive the union type of UserBitness from the userOptions
export type UserBitness = (typeof constants.userOptions.bitness)[number];

// Derive the union type of UserArchitecture from the userOptions
export type UserArchitecture =
  (typeof constants.userOptions.architecture)[number];
