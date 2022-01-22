const axios = require("axios");
apiKey = process.env.API_KEY;

function getStockPrice(ticker) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
  axios.get(url).then((res) => {
    const result = Object.values(Object.values(stockPrice)[0])[4];
    console.log(result);
  });
}
exports.getStockPrice = getStockPrice;
