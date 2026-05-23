export const formatter = (value: number) => {
  return `R$${value.toFixed(2).replace(".", ",")}`;
};
