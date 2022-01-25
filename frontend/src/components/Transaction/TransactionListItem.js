import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Dashboard/Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function TransactionListItem(props) {
    const [row, setRow] = React.useState([]);
    // console.log(props)
    const displayTransaction = (props) => {
        const {transactions} = props;
        if (transactions && transactions.length > 0) {
            return(
                <TableBody>
                {transactions.map( (transaction) => {
                    // console.log(transaction);
                    return(
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.portfolio_name}</TableCell>
                            <TableCell>{transaction.ticker}</TableCell>
                            <TableCell>{transaction.price}</TableCell>
                            <TableCell>{transaction.quantity}</TableCell>
                            <TableCell align="right">{transaction.type}</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            )
        }
    }
    
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
        <>
            {displayTransaction(props)}
        </>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more transactions
      </Link>
    </React.Fragment>
  );
}