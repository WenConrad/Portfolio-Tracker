import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashboard/Title";

import moment from "moment";

export default function TransactionListItem(props) {
  
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
