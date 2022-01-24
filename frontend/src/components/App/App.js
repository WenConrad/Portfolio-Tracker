import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Preferences from "../Preferences/Preferences";
import PositionList from "../Position/PositionList";
import TransactionList from "../Transaction/TransactionList";
// import SignIn from "../SignIn";
// import useToken from "./useToken";
import { authContext } from "../../providers/AuthProvider";
import { render } from "react-dom";

function App() {
  const { auth, user, login, checkAuth, logout } = useContext(authContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    checkAuth().then(() => {
      if (!auth && pathname !== "/signup") {
        navigate("/login");
      }
      if (auth && (pathname === "/login" || pathname === "signup")) {
        navigate("dashboard");
      }
    });
  }, []);

  // if (!auth && pathname !== "/signup") {
  //   return <Login />;
  // }

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/positions" element={<PositionList />} />
        <Route path="/transactions" element={<TransactionList />} />
      </Routes>
    </div>
  );
}

export default App;
