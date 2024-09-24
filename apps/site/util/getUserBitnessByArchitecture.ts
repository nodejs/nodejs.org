export const getUserBitnessByArchitecture = (
  userArchitecture: string,
  userBitness: number
) => {
  if (userArchitecture === 'arm' && userBitness === 64) {
    return 'arm64';
  }

  return userBitness;
};
