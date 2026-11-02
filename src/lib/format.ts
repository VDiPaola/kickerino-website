const units: [number, string][] = [
  [31536000, "year"],
  [2592000, "month"],
  [604800, "week"],
  [86400, "day"],
  [3600, "hour"],
  [60, "minute"],
  [1, "second"],
];

export function durationHuman(seconds: number) {
  const [size, unit] = units.find(([s]) => seconds >= s) ?? units[units.length - 1];
  const n = Math.floor(seconds / size);
  return `${n} ${unit}${n === 1 ? "" : "s"}`;
}
