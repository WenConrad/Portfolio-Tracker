import axios from "axios";

const { useState, createContext } = require("react");

export const authContext = createContext();

const AuthProvider = function (props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = function (credentials) {
    return axios
      .post("/users/login", {
        email: credentials.email,
        password: credentials.password,
      })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          setAuth(true);
        } else {
          throw Error("ur login bad");
        }
      });
  };

  const checkAuth = function () {
    return axios.get("users/auth").then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        setUser(res.data.user);
        setAuth(true);
      } else {
        throw Error("ur login bad");
      }
    });
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  const providerData = { auth, user, login, checkAuth, logout };

  return (
    <authContext.Provider value={providerData}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
