const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const database = require("../queries");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* register */
router.post("/register", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  database
    .addUser(user)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch((e) => res.send(e));
});

/* login */
const login = function (email, password) {
  return database.getUserWithEmail(email).then((user) => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
};
exports.login = login;

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      res.send({ user: { name: user.name, email: user.email, id: user.id } });
    })
    .catch((e) => res.send(e));
});

router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.send({ message: "not logged in" });
    return;
  }

  database
    .getUserWithId(userId)
    .then((user) => {
      if (!user) {
        res.send({ error: "no user with that id" });
        return;
      }

      res.send({ user: { name: user.name, email: user.email, id: userId } });
    })
    .catch((e) => res.send(e));
});

module.exports = router;
