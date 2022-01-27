import axios from "axios";

const { useState, createContext } = require("react");

export const portfoliosContext = createContext();

const PortfolioProvider = function (props) {
  const [portfolios, setPortfolios] = useState([]);
  const [positions, setPositions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const getPortfolios = () => {
    return axios
      .get("/stocks/portfolio")
      .then((res) => {
        setPortfolios(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getPositions = () => {
    return axios
      .get("/stocks/positions")
      .then((res) => {
        setPositions(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getTransactions = () => {
    return axios
      .get("/stocks/transactions")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
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
