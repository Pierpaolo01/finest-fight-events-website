export default function useFormattedDate() {
  const format = (date: string, { locale = "default" } = {}) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(date));
  };

  return { format };
}
