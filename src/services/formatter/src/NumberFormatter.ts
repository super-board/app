export function toCompactNumber(num: number): string {
  const formatter = new Intl.NumberFormat("en", {notation: "compact"});
  return formatter.format(num);
}
