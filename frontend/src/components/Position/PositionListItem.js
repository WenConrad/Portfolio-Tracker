import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashboard/Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function PositionListItem(props) {
  // console.log(props)
  const displayPosition = (props) => {
    const { positions } = props;
    if (positions && positions.length > 0) {
      return (
        <TableBody>
          {positions.map((position) => {
            // console.log(position);
            return (
              <TableRow key={position.id}>
                <TableCell>{position.portfolio_name}</TableCell>
                <TableCell>{position.ticker}</TableCell>
                <TableCell>{position.book_cost}</TableCell>
                <TableCell>{position.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    }
  };

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Portfolio</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Book Cost</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        {/* Display transactions from props */}
        <>{displayPosition(props)}</>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
