export function rm(amount: number): string {
  return `RM ${amount.toLocaleString("en-MY", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
