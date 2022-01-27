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
    for (let item in data) {
      dataWithIdKey.push({ ...data[item], id: item });
    }
    setPositions(dataWithIdKey);
  };

  const getTransactions = async () => {
    const { data } = await axios.get("/stocks/transactions");
    console.log(data);
    setTransactions(data);
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
