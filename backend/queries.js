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

const getStockPositions = function (user_id) {
  let myQuery = `SELECT * FROM transactions WHERE user_id = $1;`;
  let params = [user_id];
  return pool
    .query(myQuery, params)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getStockPositions = getStockPositions;

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
