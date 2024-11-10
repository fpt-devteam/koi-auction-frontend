export const formatCurrency = (value, currency) => {
  const formattedValue = value ? value.toLocaleString("en-US") : "0";
  return `${formattedValue} ${currency}`;
};
