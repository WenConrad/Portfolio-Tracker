import axios from "axios";

const { useState, createContext } = require("react");

export const portfoliosContext = createContext();

const PortfolioProvider = function (props) {
  const [portfolios, setPortfolios] = useState([]);
  const [positions, setPositions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const getPortfolios = async () => {
    const { data } = await axios.get("/stocks/portfolio");
    console.log(data);
    setPortfolios(data);
  };

  const getPositions = async () => {
    const { data } = await axios.get("/stocks/positions");
    const dataWithIdKey = [];
    for (let i in data) {
      dataWithIdKey.push({
        ...data[i],
        id: i,
        book_value: data[i].book_cost * data[i].quantity,
        market_value: data[i].market_price * data[i].quantity,
        "gain/loss":
          (data[i].market_price * data[i].quantity) /
            (data[i].book_cost * data[i].quantity) -
          1,
      });
    }
    setPositions(dataWithIdKey);
  };

  const getTransactions = async () => {
    const { data } = await axios.get("/stocks/transactions");
    const dataWithIdKey = [];
    for (let i in data) {
      dataWithIdKey.push({
        ...data[i],
        total_price: data[i].price * data[i].quantity,
      });
    }
    setTransactions(dataWithIdKey);
  };

  const providerData = {
    portfolios,
    getPortfolios,
    setPortfolios,
    positions,
    getPositions,
    setPositions,
    transactions,
    getTransactions,
    setTransactions,
  };

  return (
    <portfoliosContext.Provider value={providerData}>
      {props.children}
    </portfoliosContext.Provider>
  );
};

export default PortfolioProvider;
