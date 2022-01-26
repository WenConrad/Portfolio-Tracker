const axios = require("axios");
// apiKey = process.env.API_KEY;

// function getStockPrice(ticker) {
//   const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
//   axios.get(url).then((res) => {
//     const result = Object.values(Object.values(stockPrice)[0])[4];
//     console.log(result);
//   });
// }

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
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
      return res.data.quoteResponse.result.map((stock) => {
        return { symbol: stock.symbol, price: stock.regularMarketPrice };
      });
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
