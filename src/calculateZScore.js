import { bgRed, bgGreen, bgYellow, reset, padString } from "./utils.js";

export default function calculateZScore(closePrices) {
  // calc

  const mean =
    closePrices.reduce((acc, val) => acc + val, 0) / closePrices.length;

  const standardDeviation = Math.sqrt(
    closePrices.reduce((acc, val) => acc + (val - mean) ** 2, 0) /
      closePrices.length,
  );

  const recentClose = closePrices[closePrices.length - 1];
  const zScore = (recentClose - mean) / standardDeviation;

  // logs

  let zScoreBgColor;
  if (zScore < -1) {
    zScoreBgColor = bgGreen;
  } else if (zScore > 1) {
    zScoreBgColor = bgRed;
  } else {
    zScoreBgColor = bgYellow;
  }

  console.log(
    `${zScoreBgColor}${padString(`Z-score: ${zScore}`, " ")}${reset}`,
  );
}
