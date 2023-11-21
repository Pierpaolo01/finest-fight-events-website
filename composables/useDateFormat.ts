export default function useFormattedDate() {
    const format = (date: string, { locale = 'default', onlyDate = false } = {}) => {
      // TODO fix hydration issue when using SSR
      // TODO make the options work
      // const options = onlyDate
      //   ? { year: 'numeric', month: 'numeric', day: 'numeric', hour: undefined, minute: undefined, second: undefined}
      //   : { year: 'numeric', month: 'number', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  
      return new Intl.DateTimeFormat(locale).format(new Date(date));
    };
  
    return { format };
  }
  