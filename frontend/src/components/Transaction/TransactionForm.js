import * as React from 'react';
import { FormControl, TextField, Button, Input, MenuItem } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Title from '../Dashboard/Title';

import axios from 'axios';
import moment from 'moment';

function addTransaction(user) {
    axios.post("/stocks/transactions/new", user).then(function (res) {
    //   console.log(res.data);
    });
  }

const  types = [
    { value: 'SELL', label: 'SELL'},
    { value: 'BUY', label: 'BUY'}
]

export default function TransactionForm() {
  // console.log(props)
  const [type, setType] = React.useState('BUY');
  const [value, setValue] = React.useState(new Date('2022-1-24'));

  const handleChange = (newValue) => {
    setValue(moment(newValue).format('YYYY-MM-DD'));
  };
  
  const handleTypeChange = (newType) => {
    setType(newType.target.value);
  };

  let ticker='AAPL', price=16545, quantity=213, portfolio='test';
  let transaction = {date: value, ticker:ticker, type:type, price:price, quantity:quantity, portfolio_name:portfolio}
  
  const handleSubmit = (event) => {
      transaction = {date: value, ticker:ticker, type:type, price:price, quantity:quantity, portfolio_name:portfolio}
      console.log(value);
    // event.preventDefault();
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
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
         
          <TextField required id='inputType' label='Portfolio Name' onChange={(e) =>{portfolio=e.target.value}}></TextField>
          <TextField required id='inputType' label='Ticker' onChange={(e) =>{ticker=e.target.value}}></TextField>
          <TextField required id='inputType' label='Price' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) =>{price=e.target.value}}></TextField>
          <TextField required id='inputType' label='Quantity' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) =>{quantity=e.target.value}}></TextField>

          <TextField 
          required
          id='inputType' 
          select={type}
          label='Type' 
          value={type}
          onChange={handleTypeChange} >
            {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
          </TextField>          
          <Button onClick={handleSubmit}>Add Transaction</Button>
      </FormControl>
    </React.Fragment>
  );
}