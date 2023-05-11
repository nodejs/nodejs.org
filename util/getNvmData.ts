export const getNvmLatestVersion = async () => {
  const response = await fetch(
    'https://api.github.com/repos/nvm-sh/nvm/releases/latest'
  );
  const data = await response.json();
  return data.tag_name;
};
