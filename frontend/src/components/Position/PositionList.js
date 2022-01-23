import React from 'react';

const axios = require('axios');

async function axiosTest() {
    axios.get("/stocks/transactions", { 'headers': { 'Authorization': "AuthStr" } }).then(function (res) {
      console.log(res.data);
    });
  }

export default function PositionList(){
    const handleSubmit = async (e) => {
        e.preventDefault();
        
       await axiosTest();
       
      }

    return(
        <><h3>possitions!</h3>
        <button onClick={handleSubmit}/></>
    )
}