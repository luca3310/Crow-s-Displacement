const consoleWidth = 80;

export const bgRed = "\x1b[48;5;88m";
export const bgGreen = "\x1b[48;5;28m";
export const bgYellow = "\x1b[48;5;136m";
export const bgBlack = "\x1b[48;5;0m";
export const fgRed = "\u001b[34m";
export const reset = "\x1b[0m";

export function padString(str, paddingValue) {
  return (paddingValue + str + paddingValue.repeat(consoleWidth)).substring(
    0,
    consoleWidth,
  );
}

export function coloredBackgroundLine(bgColor, consoleWidth) {
  return `${bgColor}${" ".repeat(consoleWidth)}${reset}`;
}

export const separator = padString("", "─");
