import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const { useState, createContext } = require("react");

export const darkModeProvider = createContext();

const DarkModeProvider = function (props) {
  const [mode, setMode] = useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const providerData = { colorMode, theme };

  return (
    <darkModeProvider.Provider value={providerData}>
      {props.children}
    </darkModeProvider.Provider>
  );
};

export default DarkModeProvider;
