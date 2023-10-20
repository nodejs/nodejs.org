export function shortHumanReadableDate(date: Date, locale?: string) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' } as const;
  const formattedDate = new Intl.DateTimeFormat(
    locale ?? navigator.language,
    options
  ).format(date);

  return formattedDate;
}
