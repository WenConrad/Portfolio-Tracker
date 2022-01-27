import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashboard/Title";
import { DataGrid } from '@mui/x-data-grid';

import moment from "moment";

function TransactionListItem(props) {
  
  // console.log(props)
  const displayTransaction = (props) => {
    const { transactions } = props;
    if (transactions && transactions.length > 0) {
      return (
        <TableBody>
          {transactions.map((transaction) => {
            // console.log(transaction);
            let date = moment(transaction.date).format('YYYY-MM-DD');
            return (
              <TableRow key={transaction.id}>
                <TableCell>{date}</TableCell>
                <TableCell>{transaction.portfolio_name}</TableCell>
                <TableCell>{transaction.ticker}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell align="right">{transaction.type}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    }
  };

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Portfolio</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        {/* Display transactions from props */}
        <>{displayTransaction(props)}</>
      </Table>
    </React.Fragment>
  );
}

const columns = [
  { field: 'date', 
    headerName: 'Date', 
    valueFormatter: (params) => {
      const valueFormatted = moment(params.value).format('YYYY-MM-DD');
      return `${valueFormatted}`;
    },
    flex: 1,
  },
  { field: 'portfolio_name', 
    headerName: 'Portfolio', 
    flex: 1,
  },
  { field: 'ticker', 
    headerName: 'Ticker', 
    flex: 0.75, 
  },
  { field: 'price', 
    headerName: 'Book Cost', 
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').toLocaleString();
      return `$ ${valueFormatted}`;
    },
    flex: 1,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    flex: 0.75,
  },
  { field: 'type', 
    headerName: 'Type', 
    flex: 0.75, 
  },
];

function TransactionDataTable(props) {
  const { transactions } = props;
  if(!props.transactions){
    return (
      <React.Fragment>
      <Title>All Transactions</Title>
        <div style={{ height: '75vh', width: '100%' }}>
          You have no investments yet!
        </div>
    </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Title>All Transactions</Title>
        <div style={{ height: '75vh', width: '100%' }}>
          <DataGrid
            rows={transactions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
    </React.Fragment>
  );
}

export default TransactionDataTable;