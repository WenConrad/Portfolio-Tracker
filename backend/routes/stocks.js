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
  console.log(req.session.userId);
  let user = req.session.userId;
  database.addTransaction(user, req.body).then((result) => {
    res.json(result);
  });
});

router.get("/positions", function (req, res, next) {
  let user = req.session.userId;
  database.getStockPositions(user).then((result) => {
    console.log(result);
    res.json(result);
  });
});

router.get("/portfolio/:name", function (req, res, next) {
  let user = req.session.user;
  database.getPositionsByPortfolio(user, req.params.name).then((result) => {
    res.json(result);
  });
});

module.exports = router;
