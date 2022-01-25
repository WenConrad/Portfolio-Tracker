const express = require("express");
const router = express.Router();
const queries = require("../queries");
const apiTest = require("../stock-prices");

/* GET home page. */
router.get("/", function (req, res, next) {
  queries.getUserWithEmail("conradwen@gmail.com").then((user) => {
    console.log(req.body);
    res.json({ user });
  });
});

router.post("/", function (req, res, next) {
  queries.getUserWithEmail(req.body.username).then((user) => {
    console.log(user);
    res.json(user);
  });
});

router.get("/stockapi", function (req, res, next) {
  apiTest.getStockPrice(["TSLA", "AMZN", "GME"]).then((stocks) => {
    res.json(stocks);
  });
});

router.get("/stocksearch", function (req, res, next) {
  apiTest.getSymbol("TSLA").then((stocks) => {
    res.json(stocks);
  });
});

module.exports = router;
