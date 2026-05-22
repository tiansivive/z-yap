const ON = process.stdout.isTTY !== false;

const CODES = {
  reset: "0", bold: "1", dim: "2",
  red: "31", green: "32", yellow: "33",
  blue: "34", magenta: "35", cyan: "36",
  gray: "90",
};

export const c = Object.fromEntries(
  Object.entries(CODES).map(([name, code]) => [name, ON ? `\x1b[${code}m` : ""])
);
