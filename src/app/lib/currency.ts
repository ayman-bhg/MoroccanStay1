/** Moroccan dirham (MAD) — display for UI only */
export function formatMad(amount: number): string {
  const n = Math.round(amount);
  return `${n.toLocaleString("fr-MA", { maximumFractionDigits: 0 })} Dh`;
}
