const NBSP = " ";

export function rm(amount: number): string {
  // Non-breaking space so "RM 11,598" can never split across lines
  // on narrow phone viewports.
  return `RM${NBSP}${amount.toLocaleString("en-MY", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
