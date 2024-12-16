export function dateFormatter({
  date,
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
}: {
  date: string;
  options?: Intl.DateTimeFormatOptions;
}) {
  return new Date(date).toLocaleDateString('es-ES', options);
}
