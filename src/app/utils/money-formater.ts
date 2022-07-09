export function moneyFormater(money: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(money).slice(1);
}
