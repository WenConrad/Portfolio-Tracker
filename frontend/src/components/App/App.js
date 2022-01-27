import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Preferences from "../Preferences/Preferences";
import PositionList from "../Position/PositionList";
import TransactionList from "../Transaction/TransactionList";
import { lightTheme, darkTheme } from "../Template/theme";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// authProvider
import { authContext } from "../../providers/AuthProvider";
import { render } from "react-dom";
import { portfoliosContext } from "../../providers/PortfolioProvider";
import SignInSide from "../Login/LoginSide";

function App() {
  const { auth, user, login, checkAuth, logout } = useContext(authContext);
  const { getPortfolios } = useContext(portfoliosContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // check if user is logged in
  useEffect(() => {
    checkAuth().then((res) => {
      if (!res.data.user && pathname !== "/signup") {
        navigate("/login");
      }
      if (res.data.user && (pathname === "/login" || pathname === "/signup")) {
        navigate("dashboard");
      }
    });
  }, []);

  useEffect(() => {
    getPortfolios();
  }, [auth]);

  const [theme, setTheme] = React.useState(true)
  const icon = !theme ? <Brightness7Icon /> : <Brightness4Icon /> // Icons imported from `@material-ui/icons`
  const appliedTheme = createTheme(theme ? darkTheme : lightTheme)

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<SignInSide />} />
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<SignInSide />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio/:name" element={<Dashboard />} />
          <Route path="/positions" element={<PositionList />} />
          {/* <Route path="/portfolio/:name" element={<PositionList />} /> */}
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
