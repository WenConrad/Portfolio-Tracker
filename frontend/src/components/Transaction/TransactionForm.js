import * as React from 'react';
import { FormControl, TextField, Button, MenuItem, Stack } from '@mui/material';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Title from '../Dashboard/Title';


import { useEffect } from 'react';

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

export default function TransactionForm(props) {
  
  const [portfolio, setPortfolio] = React.useState('test');
  const [type, setType] = React.useState('BUY');
  const [value, setValue] = React.useState(new Date('2022-1-24'));
  
  const handleChange = (newValue) => {
    setValue(moment(newValue).format('YYYY-MM-DD'));
  };
  
  const handleTypeChange = (newType) => {
    setType(newType.target.value);
  };
  
  let ticker='AAPL', price=16545, quantity=213;
  let transaction = {date: value, ticker:ticker, type:type, price:price, quantity:quantity, portfolio_name:portfolio}
  
  const handleSubmit = (event) => {
      transaction = {date: value, ticker:ticker, type:type, price:price, quantity:quantity, portfolio_name:portfolio}
      console.log(value);
      // event.preventDefault();
      addTransaction(transaction);
    }

  const displayPortfolio = (props) => {
      console.log("props > transaction Form")
      console.log(props)
      const {portfoliolist} = props;
      if (portfoliolist && portfoliolist.length > 0) {
        return(
          <TextField 
          required
          id='inputType' 
          select={portfolio}
          label='Portfolio Name' 
          value={portfolio}
          onChange={(e) => {setPortfolio(e.target.value)}}> 
          {portfoliolist.map((portfolio) => {
            console.log("add port to select")
            return (
              <MenuItem key={portfolio.id} value={portfolio.name}>
                {portfolio.name}
              </MenuItem>
            )
          })}
          </TextField>
        )
      }
  };

  return (
    <React.Fragment>
      <Title>Add Transaction</Title>
      <FormControl>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={DateAdapter}>
          {/* <DateTimePicker
          id="inputDate"
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          /> */}
          <MobileDatePicker
          label="Date"
          inputFormat="YYYY-MM-DD"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
         

          <>{displayPortfolio(props)}</>

          <TextField required id='inputType' label='Ticker' onChange={(e) =>{ticker=e.target.value}}></TextField>
          <TextField required id='inputType' label='Price' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) =>{price=e.target.value}} type={"number"}></TextField>
          <TextField required id='inputType' label='Quantity' inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) =>{quantity=e.target.value}} type={"number"}></TextField>

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
        </Stack>
      </FormControl>
    </React.Fragment>
  );
}