const DEFAULT_LOCALE = 'id-ID';
const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
};

export const formatDate = (
  value?: string | number | Date | null,
  locale: string = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS
): string => {
  if (!value) {
    return '-';
  }

  const date =
    typeof value === 'string' || typeof value === 'number'
      ? new Date(value)
      : value;

  if (isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString(locale, options);
};
