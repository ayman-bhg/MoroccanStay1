export function formatMad(amount) {
    const n = Math.round(amount);
    return `${n.toLocaleString("fr-MA", { maximumFractionDigits: 0 })} Dh`;
}

