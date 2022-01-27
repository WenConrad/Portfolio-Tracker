const axios = require("axios");
const rAPIKey = process.env.RA_API_KEY;

const getStockPrice = function (tickers) {
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/market/v2/get-quotes",
    params: { region: "US", symbols: tickers.toString() },
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": rAPIKey,
    },
  };
  return axios
    .request(options)
    .then((res) => {
      const pricesList = res.data.quoteResponse.result;
      const stocksPrices = {};
      for (let price of pricesList) {
        stocksPrices[price.symbol] = price.regularMarketPrice;
      }
      return stocksPrices;
    })
    .catch((error) => console.error(error));
};
exports.getStockPrice = getStockPrice;

const getSymbol = function (ticker) {
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/auto-complete",
    params: { q: ticker },
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": rAPIKey,
    },
  };

  return axios
    .request(options)
    .then((res) => {
      return res.data.quotes
        .filter((stock) => stock.quoteType !== "OPTION")
        .map((stock) => stock.symbol);
    })
    .catch((error) => {
      console.error(error);
    });
};
exports.getSymbol = getSymbol;
