import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// Components
import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Preferences from "../Preferences/Preferences";
import PositionList from "../Position/PositionList";
import TransactionList from "../Transaction/TransactionList";
// authProvider
import { authContext } from "../../providers/AuthProvider";

function App() {
  const { auth, user, login, checkAuth, logout } = useContext(authContext);
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

  const logoutRedirect = function () {
    logout().then((res) => {
      navigate("/login");
    });
  };

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/positions" element={<PositionList />} />
        <Route path="/portfolio/:name" element={<PositionList />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
      <button onClick={logoutRedirect}>logout test button</button>
    </div>
  );
}

export default App;
