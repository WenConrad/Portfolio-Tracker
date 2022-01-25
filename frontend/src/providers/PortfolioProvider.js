import axios from "axios";

const { useState, createContext } = require("react");

export const portfoliosContext = createContext();

const PortfolioProvider = function (props) {
  const [portfolios, setPortfolios] = useState([]);

  const getPortfolios = () => {
    return axios
      .get("/stocks/portfolio")
      .then((res) => {
        setPortfolios(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const providerData = { portfolios, getPortfolios };

  return (
    <portfoliosContext.Provider value={providerData}>
      {props.children}
    </portfoliosContext.Provider>
  );
};

export default PortfolioProvider;
