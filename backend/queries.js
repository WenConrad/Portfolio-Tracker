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
    positions.id,
    positions.ticker,
    SUM(positions.book_cost) as book_cost,
    SUM(positions.quantity) as quantity,
    portfolios.name AS portfolio_name
    FROM positions JOIN portfolios ON portfolios.id = portfolio_id
    WHERE user_id = $1
    GROUP BY positions.ticker, portfolios.name, positions.id;`;
  let params = [user_id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getStockPositions = getStockPositions;

const addTransaction = async function (transaction) {
  console.log("transaction");
  console.log(transaction);
  if (transaction.type === "BUY") {
    let positionsQuery = `INSERT INTO positions
      (date, ticker, book_cost, quantity, portfolio_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    let positionsParams = [
      transaction.date,
      transaction.ticker,
      transaction.price,
      transaction.quantity,
      transaction.portfolio_id,
    ];
    pool
      .query(positionsQuery, positionsParams)
      .then((result) => console.log(result.rows))
      .catch((err) => {
        console.log(err.message);
      });
  } else if (transaction.type === "SELL") {
    let myQuery = `SELECT * FROM positions
      WHERE ticker = $1 AND portfolio_id = $2
      ORDER BY date ASC;`;
    let params = [transaction.ticker, transaction.portfolio_id];
    const checkPositions = await pool.query(myQuery, params);
    let stockToBeSold = transaction.quantity;
    let i = 0;
    while (stockToBeSold > 0) {
      let position = checkPositions[i];
      if (position.quantity <= stockToBeSold) {
        stockToBeSold -= position.quantity;
        pool
          .query(
            `DELETE FROM positions WHERE id = $1 RETURNING *;`,
            position.id
          )
          .then((result) => console.log(result.rows))
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        let newQuantity = position.quantity - stockToBeSold;
        pool
          .query(`UPDATE positions SET quantity = $1 RETURNING *;`, newQuantity)
          .then((result) => console.log(result.rows))
          .catch((err) => {
            console.log(err.message);
          });
        stockToBeSold = 0;
      }
      i++;
    }
  }
  let myQuery = `INSERT INTO transactions
  (date, ticker, type, price, quantity, portfolio_id)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

  let params = [
    transaction.date,
    transaction.ticker,
    transaction.type,
    transaction.price,
    transaction.quantity,
    transaction.portfolio_id,
  ];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addTransaction = addTransaction;

const getPortfolios = function (user_id) {
  let myQuery = `SELECT * FROM portfolios WHERE user_id = $1;`;
  let params = [user_id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getPortfolios = getPortfolios;

const addPortfolio = function (portfolio_name, user_id) {
  let myQuery = `INSERT INTO portfolios (name, user_id) VALUES ($1, $2) RETURNING *;`;
  let params = [portfolio_name, user_id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addPortfolio = addPortfolio;

const getPositionsByPortfolio = function (user_id, portfolio_name) {
  let myQuery = `SELECT
    positions.id,
    positions.ticker,
    SUM(positions.book_cost) as book_cost,
    SUM(positions.quantity) as quantity,
    portfolios.name AS portfolio_name
    FROM positions JOIN portfolios ON portfolios.id = portfolio_id
    WHERE user_id = $1 AND portfolios.name = $2
    GROUP BY positions.ticker, portfolios.name, positions.id;`;
  let params = [user_id, portfolio_name];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getPositionsByPortfolio = getPositionsByPortfolio;
