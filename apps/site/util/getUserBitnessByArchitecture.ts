export const getUserBitnessByArchitecture = (
  userArchitecture: string,
  userBitness: number | string
) => {
  if (userArchitecture === 'arm' && userBitness === 64) {
    return 'arm64';
  }

  return String(userBitness);
};
