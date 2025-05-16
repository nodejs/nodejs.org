import type { OperatingSystemLabel } from '../downloadUtils/constants.json';
import type downloadConstants from '../downloadUtils/constants.json';

// This infers the keys from OperatingSystemLabel as the UserOS type.
export type UserOS = keyof typeof OperatingSystemLabel;

// Derive the union type of UserPlatform from the JSON array values.
export type UserPlatform = (typeof downloadConstants.UserPlatform)[number];

// Derive the union type of UserBitness from the JSON array values.
export type UserBitness = (typeof downloadConstants.UserBitness)[number];

// Derive the union type of UserArchitecture from the JSON array values.
export type UserArchitecture =
  (typeof downloadConstants.UserArchitecture)[number];
