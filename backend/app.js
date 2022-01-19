const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const testRouter = require("./routes/test");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2", "key3"],
    maxAge: 60 * 60 * 1000,
  })
);
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/test", testRouter);

module.exports = app;
