import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function getStocks(region) {
  const stocks = [];

  try {
    const response = await axios.get(
      "https://yfapi.net/v1/finance/trending/" + region,
      {
        params: { modules: "assetProfile" },
        headers: {
          "x-api-key": process.env.APIKEY,
        },
      },
    );

    response.data.finance.result[0].quotes.forEach((stock) => {
      stocks.push(stock.symbol);
    });
  } catch (error) {
    console.error(error);
  }

  return stocks;
}
