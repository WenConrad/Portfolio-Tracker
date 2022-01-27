import * as React from "react";
import {
  FormControl,
  TextField,
  Button,
  Input,
  MenuItem,
  Stack,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import NumberFormat from "react-number-format";
import Title from "../Dashboard/Title";

import axios from "axios";
import moment from "moment";
import { portfoliosContext } from "../../providers/PortfolioProvider";
import { Link } from "react-router-dom";
import TickerSearch from "./TickerSearch";

function addTransaction(user) {
  axios.post("/stocks/transactions/new", user).then(function (res) {
    //   console.log(res.data);
  });
}

const types = [
  { value: "SELL", label: "SELL" },
  { value: "BUY", label: "BUY" },
];

const NumberFormatPrice = React.forwardRef(function NumberFormatPrice(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

const NumberFormatQuantity = React.forwardRef(function NumberFormatQuantity(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
});

export default function TransactionForm() {
  // console.log(props)
  const { portfolios } = React.useContext(portfoliosContext);
  const [portfolioName, setPortfolioName] = React.useState(
    portfolios[0] && portfolios[0].id
  );
  const [type, setType] = React.useState("BUY");
  const [value, setValue] = React.useState(new Date("2022-1-24"));
  const [ticker, setTicker] = React.useState("");
  const [price, setPrice] = React.useState(123);
  const [quantity, setQuantity] = React.useState(123);

  const handlePortfolioChange = (newPortfolio) => {
    setPortfolioName(newPortfolio.target.value);
  };

  const handleTypeChange = (newType) => {
    setType(newType.target.value);
  };

  const handleChange = (newValue) => {
    setValue(newValue.target.value);
  };

  const handlePriceChange = (newValue) => {
    setPrice(newValue.target.value);
  };

  const handleQuantityChange = (newValue) => {
    setQuantity(newValue.target.value);
  };

  const handleTickerChange = (val) => {
    setTicker(val);
  };

  let transaction = {
    date: value,
    ticker: ticker,
    type: type,
    price: price,
    quantity: quantity,
    portfolio_id: portfolioName,
  };

  const handleSubmit = (event) => {
    transaction = {
      date: value,
      ticker: ticker,
      type: type,
      price: price,
      quantity: quantity,
      portfolio_id: portfolioName,
    };
    // event.preventDefault();
    addTransaction(transaction);
  };

  if (!portfolios[0]) {
    return (
      <React.Fragment>
        <Title>No Portfolios!</Title>
        Head to portfolios to create a new portfolio!
        <Button component={Link} to={"/positions"}>
          Portfolios
        </Button>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Title>Add Transaction</Title>
      <FormControl>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              id="inputDate"
              label="Date"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            required
            id="inputType"
            select
            label="Portfolio Name"
            value={portfolioName}
            onChange={handlePortfolioChange}
          >
            {portfolios.map((port) => (
              <MenuItem key={port.id} value={port.id}>
                {port.name}
              </MenuItem>
            ))}
          </TextField>
          <TickerSearch
            value={ticker}
            ticker={ticker}
            handleTickerChange={handleTickerChange}
          ></TickerSearch>
          <TextField
            required
            label="Price"
            value={price.NumberFormat}
            onChange={handlePriceChange}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatPrice,
            }}
          />
          <TextField
            required
            label="Quantity"
            value={quantity.NumberFormat}
            onChange={handleQuantityChange}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatQuantity,
            }}
          />
          <TextField
            required
            id="inputType"
            select={type}
            label="Type"
            value={type}
            onChange={handleTypeChange}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleSubmit}>Add Transaction</Button>
        </Stack>
      </FormControl>
    </React.Fragment>
  );
}
