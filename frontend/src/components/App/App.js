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
  const { auth, user, login, logout } = useContext(authContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!auth && pathname !== "/signup") {
      navigate("/login");
    }
  }, [auth]);

  // if (!auth && pathname !== "/signup") {
  //   return <Login />;
  // }

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/positions" element={<PositionList />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
