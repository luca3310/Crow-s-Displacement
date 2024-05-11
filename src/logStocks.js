import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import calculateVolatility from "./calculateVolatility.js";
import calculateZScore from "./calculateZScore.js";
import {
  reset,
  padString,
  separator,
  coloredBackgroundLine,
  bgBlack,
} from "./utils.js";

export default function logStock(stock) {
  var options = {
    method: "GET",
    url: `https://yfapi.net/v8/finance/chart/${stock}?range=1mo&interval=1d&region=US&lang=en&events=div,split`,
    params: { modules: "assetProfile" },
    headers: {
      "x-api-key": process.env.APIKEY,
    },
  };

  try {
    axios
      .request(options)
      .then(function (response) {
        const closePrices =
          response.data.chart.result[0].indicators.quote[0].close;

        const currentPrice = closePrices[closePrices.length - 1];

        console.log(coloredBackgroundLine(bgBlack, 80));
        console.log(`${bgBlack}${separator}${reset}`);
        console.log(`${bgBlack}${padString(`Stock: ${stock}`, " ")}${reset}`);
        console.log(
          `${bgBlack}${padString(`Current Price: ${currentPrice.toFixed(2)}`, " ")}${reset}`,
        );
        console.log(coloredBackgroundLine(bgBlack, 80));
        calculateZScore(closePrices);
        calculateVolatility(closePrices);
        console.log(`${bgBlack}${separator}${reset}`);
        console.log(coloredBackgroundLine(bgBlack, 80));

        // TODO
        // Historical Volatility
        // Implied Volatility
        // Moving Average Convergence Divergence (MACD)
        // Relative Strength Index (RSI)
        // Bollinger Bands
        // Fibonacci Retracement
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}
