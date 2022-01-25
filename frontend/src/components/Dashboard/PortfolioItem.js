import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashboard/Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function PortfolioItem(props) {
    // const [row, setRow] = React.useState([]);
    // console.log(props)
    const displayTransaction = (props) => {
        const {portfolios} = props;
        if (portfolios && portfolios.length > 0) {
            return(
                <TableBody>
                {portfolios.map( (portfolio) => {
                    // console.log(transaction);
                    return(
                        <TableRow key={portfolio.id}>
                            
                            <TableCell>{portfolio.name}</TableCell>
                            
                        </TableRow>
                    )
                })}
                </TableBody>
            )
        }
    };

  return (
    <React.Fragment>
      <Title>Your Portfolios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            
            <TableCell>Portfolio</TableCell>
            
            
            
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        {/* Display transactions from props */}
        <>{displayTransaction(props)}</>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more transactions
      </Link>
    </React.Fragment>
  );
}
