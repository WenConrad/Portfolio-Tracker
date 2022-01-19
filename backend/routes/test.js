const express = require("express");
const router = express.Router();
const queries = require("../queries");

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

module.exports = router;
