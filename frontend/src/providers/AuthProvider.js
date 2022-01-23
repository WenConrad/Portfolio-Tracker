const { useState, createContext } = require("react");

export const authContext = createContext();

const AuthProvider = function (props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);

  const login = function (email, password) {
    setAuth(true);
    setUser({ email, id: "id", name: "test User" });
  };

  const logout = function () {
    setAuth(false);
    setUser(null);
  };

  const providerData = { auth, user, login, logout };

  return (
    <authContext.Provider value={providerData}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
