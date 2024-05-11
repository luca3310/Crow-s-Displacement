import getStocks from "./src/getStocks.js";
import logStock from "./src/logStocks.js";

const init = async () => {
  const stocks = await getStocks("US");
  stocks.slice(0, 2).forEach((stock) => logStock(stock));
};

init();
