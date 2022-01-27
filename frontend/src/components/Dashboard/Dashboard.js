import * as React from "react";
// mui components
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// mui icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// template components
import { mainListItems, LogOutItem } from "../Template/listItems";
import Copyright from "../Template/Template";
import { AppBar, Drawer } from "../Template/Template";
import { lightTheme, darkTheme } from "../Template/theme";

import PortfolioDataTable from "./PositionListItem";
import { authContext } from "../../providers/AuthProvider";
import { portfoliosContext } from "../../providers/PortfolioProvider";

import { useNavigate, useParams } from "react-router-dom";


function DashboardContent() {
  const { logout, user } = React.useContext(authContext);
  const { portfolios, positions } = React.useContext(portfoliosContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let params = useParams();

  const logoutRedirect = function () {
    logout().then((res) => {
      navigate("/login");
    });
  };

  const [theme, setTheme] = React.useState()
  const icon = !theme ? <Brightness7Icon /> : <Brightness4Icon /> // Icons imported from `@material-ui/icons`
  

  return (
    
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            <IconButton sx={{ ml: 1 }} onClick={() => setTheme(!theme ? lightTheme : darkTheme)} color="inherit">
              {icon}
            </IconButton>

            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountCircleIcon />
              </Badge>
              
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>
            <LogOutItem signout={logoutRedirect} />
          </List>
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* All Positions */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* <PositionListItem positions={positions} /> */}
                  <PortfolioDataTable positions={positions} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
