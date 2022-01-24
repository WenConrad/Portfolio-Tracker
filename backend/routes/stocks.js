const express = require("express");
const router = express.Router();

const database = require("../queries");

router.get("/", function (req, res, next) {
  res.send("something");
});

router.get("/transactions", function (req, res, next) {
  // console.log(req.session.userId)
  let user = req.session.userId;
  database.getTransactions(user).then((result) => {
    res.json(result);
  });
});

router.post("/transactions/new", function (req, res, next) {
  let user = req.session.user;
  database.addPosition(user, req.body).then((result) => {
    res.json(result);
  });
});

router.get("/positions", function (req, res, next) {
  let user = req.session.userId;
  database.getStockPositions(user).then((result) => {
    const stockPositions = {};
    for (let row of result) {
      if (!stockPositions[row.portfolio_name]) {
        stockPositions[row.portfolio_name] = {};
      }
      if (!stockPositions[row.portfolio_name][row.ticker]) {
        stockPositions[row.portfolio_name][row.ticker] = {
          quantity: 0,
          price: 0,
        };
      }
      const sumQuantity = row.type === "SELL" ? -row.quantity : row.quantity;
      const sumPrice = row.price === "SELL" ? -row.price : row.price;
      stockPositions[row.portfolio_name][row.ticker].quantity += sumQuantity;
      stockPositions[row.portfolio_name][row.ticker].price += sumPrice;
      if (stockPositions[row.portfolio_name][row.ticker].quantity === 0) {
        delete stockPositions[row.portfolio_name][row.ticker];
      }
      if (stockPositions[row.portfolio_name] === {}) {
        delete stockPositions[row.portfolio_name];
      }
    }
    const positionsList = [];
    for (let portfolio in stockPositions) {
      for (let position in stockPositions[portfolio]) {
        console.log(position);
        positionsList.push({
          portfolio_name: portfolio,
          ticker: position,
          quantity: stockPositions[portfolio][position].quantity,
          price: stockPositions[portfolio][position].price,
        });
      }
    }
    res.json(positionsList);
  });
});

router.get("/portfolio/:name", function (req, res, next) {
  let user = req.session.user;
  database.getPositionsByPortfolio(user, req.params.name).then((result) => {
    res.json(result);
  });
});

module.exports = router;
