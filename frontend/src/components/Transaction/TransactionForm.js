import * as React from 'react';
import { FormControl, TextField, Button, Input, InputLabel } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Title from '../Dashboard/Title';

import axios from 'axios';

function addTransaction(user) {
    axios.post("/stocks/transactions/new", user).then(function (res) {
      console.log(res.data);
    });
  }


export default function TransactionForm() {
  // console.log(props)
  const [time, setTime] = React.useState(new Date().now);

  const handleChange = (newValue) => {
    setTime(newValue);
  };

  const transaction = {date: time, ticker:'XIA', type:'BUY', price:12345, quantity:26, portfolio_name:'TFSA'}
  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction);
  }
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <FormControl>
          <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
          id="inputDate"
          label="Date&Time picker"
          time={time}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>

          <InputLabel htmlFor='inputTicker'>Ticker</InputLabel>
          <Input id='inputTicker'></Input>
          <InputLabel htmlFor='inputType'>Type</InputLabel>
          <Input id='inputType'></Input>
          <InputLabel htmlFor='inputPrice'>Price</InputLabel>
          <Input id='inputPrice'></Input>
          <InputLabel htmlFor='inputQuantity'>Quantity</InputLabel>
          <Input id='inputQuantity'></Input>
          <InputLabel htmlFor='inputPortfolioName'>Portfolio Name</InputLabel>
          <Input id='inputPortfolioName'></Input>
          
          <Button onClick={handleSubmit}>Add Transaction</Button>
      </FormControl>
    </React.Fragment>
  );
}