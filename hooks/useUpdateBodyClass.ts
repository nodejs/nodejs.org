export const useUpdateBodyClass = () => {
  const updateBodyClass = (theme: string) => {
    if (typeof document === 'undefined' || !theme) return;
    const checkTheme = theme === 'dark' ? 'light' : 'dark';
    // Remove the previous theme classname before adding
    if (document.body.classList.contains(checkTheme)) {
      document.body.classList.remove(checkTheme);
    }
    document.body.classList.add(theme);
  };

  return updateBodyClass;
};
