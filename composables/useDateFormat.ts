export default function useFormattedDate() {
    const format = (date: string, { locale = 'default', onlyDate = false } = {}) => {
      // TODO Make this nice
      return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'short', // 'short' will give you the abbreviated month
            day: '2-digit'
        }).format(new Date(date));
    };
  
    return { format };
  }
  