export default function useFormattedCurrency() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "eur",
    }).format(amount);
  };

  return { formatCurrency };
}
