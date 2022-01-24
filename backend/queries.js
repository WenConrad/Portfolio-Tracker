require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

const getUserWithEmail = (email) => {
  let myQuery = `SELECT * FROM users WHERE email = $1;`;
  let params = [email];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = (id) => {
  let myQuery = `SELECT * FROM users WHERE id = $1;`;
  let params = [id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;

const addUser = function (user) {
  let myQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
  let params = [user.name, user.email, user.password];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

const getTransactions = function (user_id) {
  let myQuery = `SELECT transactions.*, portfolios.name AS portfolio_name FROM transactions JOIN portfolios ON portfolios.id = portfolio_id WHERE user_id = $1;`;
  let params = [user_id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getTransactions = getTransactions;

const getStockPositions = function (user_id) {
  let myQuery = `SELECT
    positions.ticker,
    SUM(positions.book_cost) as book_cost,
    SUM(positions.quantity) as quantity,
    portfolios.name AS portfolio_name
    FROM positions JOIN portfolios ON portfolios.id = portfolio_id
    WHERE user_id = $1
    GROUP BY positions.ticker, portfolios.name`;
  let params = [user_id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getStockPositions = getStockPositions;

const addPosition = function (user_id, transaction) {
  if (transaction.type === "BUY") {
    //when you insert a transaction, you need to also update the position for the user
    // const checkPosition = pool ... SELECT * from positions WHERE ticker = {transaction.ticker} AND user_id = {user_id}
    //if length.checkPosition < 1, INSERT
    //else{ UPDATE}
    //check if ticket exists for user, if it doesnt -> INSERT, if it DOES -> update the ticker
  } else if (transaction.type === "SELL") {
    //do a check here and then insert into table / update the position table
  }
  let myQuery = `INSERT INTO transactions
  (date, ticker, type, price, quantity, portfolio_name, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

  let params = [
    transaction.date,
    transaction.ticker,
    transaction.type,
    transaction.price,
    transaction.quantity,
    transaction.portfolio_name,
    user_id,
  ];
  const transactionResult = pool
    .query(myQuery, params)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });

  return transactionResult;
};
exports.addPosition = addPosition;

const getPositionsByPortfolio = function (user_id, portfolio_name) {
  let myQuery = `SELECT * FROM transactions WHERE user_id = $1 AND portfolio_name = $2;`;
  let params = [user_id, portfolio_name];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getPositionsByPortfolio = getPositionsByPortfolio;
