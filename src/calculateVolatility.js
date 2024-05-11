import { bgRed, bgGreen, bgYellow, reset, padString } from "./utils.js";

export default function calculateVolatility(closePrices) {
  // calc

  const dailyReturns = closePrices
    .slice(1)
    .map((close, index) => (close - closePrices[index]) / closePrices[index]);

  const meanReturn =
    dailyReturns.reduce((acc, val) => acc + val, 0) / dailyReturns.length;
  const squaredDeviations = dailyReturns.map(
    (returnValue) => (returnValue - meanReturn) ** 2,
  );
  const variance =
    squaredDeviations.reduce((acc, val) => acc + val, 0) /
    squaredDeviations.length;
  const volatility = Math.sqrt(variance);

  // logs

  const lowVolatilityThreshold = 0.2;
  const highVolatilityThreshold = 0.3;

  let volatilityBgColor;
  if (volatility < lowVolatilityThreshold) {
    volatilityBgColor = bgGreen;
  } else if (
    volatility >= lowVolatilityThreshold &&
    volatility <= highVolatilityThreshold
  ) {
    volatilityBgColor = bgYellow;
  } else {
    volatilityBgColor = bgRed;
  }

  console.log(
    `${volatilityBgColor}${padString(`Volatility: ${volatility}`, " ")}${reset}`,
  );
}
