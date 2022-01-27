const express = require("express");
const router = express.Router();

const database = require("../queries");
const stockAPI = require("../stock-prices");

router.get("/", function (req, res, next) {
  res.send("something");
});

router.get("/transactions", function (req, res, next) {
  console.log(req.session);
  let user = req.session.userId;
  database.getTransactions(user).then((result) => {
    res.json(result);
  });
});

router.post("/transactions/new", function (req, res, next) {
  let user = req.session.userId;
  database.addTransaction(req.body).then((result) => {
    res.json(result);
  });
});

router.get("/positions", function (req, res, next) {
  let user = req.session.userId;
  database.getStockPositions(user).then((result) => {
    // array of objects of each stock position
    const tickersList = result.map((stock) => stock.ticker);
    // query for market price of each ticker
    stockAPI.getStockPrice(tickersList).then((prices) => {
      const stocksWithPrices = result.map((stock) => {
        return { ...stock, market_price: prices[stock.ticker] };
      });
      // for (let price in prices) {
      //   result[price].market_price = prices[price].price;
      // }
      res.json(stocksWithPrices);
    });
  });
});

router.get("/portfolio/", function (req, res, next) {
  console.log(req.session);
  let user = req.session.userId;
  database.getPortfolios(user).then((result) => {
    console.log(result);
    res.json(result);
  });
});

router.post("/portfolio/new", function (req, res, next) {
  console.log(req.body.portName);
  console.log(req.session);
  let user = req.session.userId;
  database.addPortfolio(req.body.portName, user).then((result) => {
    console.log(result);
    res.json(result);
  });
});

router.get("/portfolio/:name", function (req, res, next) {
  console.log(req.params);
  let user = req.session.userId;
  database.getPositionsByPortfolio(user, req.params.name).then((result) => {
    const tickersList = result.map((stock) => stock.ticker);
    // query for market price of each ticker
    stockAPI.getStockPrice(tickersList).then((prices) => {
      for (let price in prices) {
        result[price].market_price = prices[price].price;
      }
      res.json(result);
    });
  });
});

// router.post("/prices", function (req, res, next) {
//   console.log(req.body);
//   stockAPI.getStockPrice(req.body).then((stocks) => {
//     res.json(stocks);
//   });
// });

router.post("/search", function (req, res, next) {
  console.log(req.body.ticker);
  stockAPI.getSymbol(req.body.ticker).then((stocks) => {
    res.json(stocks);
  });
});

module.exports = router;
