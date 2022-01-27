import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Title from "./Title";
import { portfoliosContext } from "../../providers/PortfolioProvider";
// import Link from "@mui/material/Link";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";

// function PositionListItem(props) {
//   // console.log(props)
//   const displayPosition = (props) => {
//     const { positions } = props;
//     if (positions && positions.length > 0) {
//       return (
//         <TableBody>
//           {positions.map((position) => {
//             // console.log(position.id);
//             return (
//               <TableRow key={position.id}>
//                 <TableCell>{position.portfolio_name}</TableCell>
//                 <TableCell>{position.ticker}</TableCell>
//                 <TableCell>{position.book_cost}</TableCell>
//                 <TableCell>{position.quantity}</TableCell>
//                 <TableCell>{position.market_price}</TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       );
//     }
//   };

//   return (
//     <React.Fragment>
//       <Title>All Positions</Title>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Portfolio</TableCell>
//             <TableCell>Ticker</TableCell>
//             <TableCell>Book Cost</TableCell>
//             <TableCell>Quantity</TableCell>
//             <TableCell>Market Price</TableCell>
//           </TableRow>
//         </TableHead>
//         {/* Display transactions from props */}
//         <>{displayPosition(props)}</>
//       </Table>
//     </React.Fragment>
//   );
// }

const columns = [
  { field: "portfolio_name", headerName: "Portfolio", flex: 1 },
  { field: "ticker", headerName: "Ticker", flex: 0.75 },
  {
    field: "book_cost",
    headerName: "Book Cost",
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        .toLocaleString();
      return `$ ${valueFormatted}`;
    },
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    flex: 0.75,
  },
  {
    field: "market_price",
    headerName: "Market Price",
    valueFormatter: (params) => {
      const valueFormatted = params.value && params.value.toLocaleString();
      return `$ ${valueFormatted}`;
    },
    flex: 1,
  },
];

function PortfolioDataTable(props) {
  const { positions } = React.useContext(portfoliosContext);
  if (!positions) {
    return (
      <React.Fragment>
        <Title>All Positions</Title>
        <div style={{ height: "75vh", width: "100%" }}>
          You have no investments yet!
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Title>All Positions</Title>
      <div style={{ height: "75vh", width: "100%" }}>
        <DataGrid
          rows={positions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  );
}

export default PortfolioDataTable;
