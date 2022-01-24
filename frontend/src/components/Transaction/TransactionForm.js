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
      <Title>Add Transaction</Title>
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


          
          <TextField id='inputType' label='Ticker'></TextField>
          <TextField id='inputType' label='Type'></TextField>
          <TextField id='inputType' label='Price'></TextField>
          <TextField id='inputType' label='Quantity'></TextField>
          <TextField id='inputType' label='Portfolio Name'></TextField>
          

          
          <Button onClick={handleSubmit}>Add Transaction</Button>
      </FormControl>
    </React.Fragment>
  );
}