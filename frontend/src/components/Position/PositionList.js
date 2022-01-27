import * as React from "react";
// mui components
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// template components
import Copyright from "../Template/Template";

import PortfolioItem from "./PortfolioItem";
import PortfolioDataTable from "../Dashboard/PositionListItem";

function DashboardContent() {
  return (
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Portfolios */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <PortfolioItem />
              </Paper>
            </Grid>

            {/* positions */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <PortfolioDataTable />
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
  );
}

export default function PositionList() {
  return <DashboardContent />;
}
