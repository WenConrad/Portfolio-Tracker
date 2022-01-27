import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashboard/Title";
import NewPortfolioForm from "./NewPortfolioForm";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

export default function PortfolioItem(props) {
  // console.log(props)
  const displayPortfolio = (props) => {
    const { portfolios } = props;
    if (portfolios && portfolios.length > 0) {
      return (
        <TableBody>
          {portfolios.map((portfolio) => {
            // console.log(transaction);
            return (
              <TableRow key={portfolio.id}>
                <TableCell>
                  <Button 
                  variant="contained"
                  size="medium"
                  startIcon={<FolderSpecialIcon/>}
                  LinkComponent={Link} to={"/portfolio/" + portfolio.name}
                  color="primary"
                  >
                    {portfolio.name}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          <TableRow>
            <TableCell>You don't have any portfolios yet!</TableCell>
          </TableRow>
        </TableBody>
      );
    }
  };

  return (
    <React.Fragment>
      <Title>Your Portfolios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Portfolio(s)</TableCell>
          </TableRow>
        </TableHead>
        {/* Display transactions from props */}
        <>{displayPortfolio(props)}</>
      </Table>
      <NewPortfolioForm />
    </React.Fragment>
  );
}
