import React, { useState } from "react";

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();
  const [userEmail, setUserEmail] = useState("");

  return (
    <AuthContext.Provider
      value={{ isAuth, userEmail, setIsAuth, setUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
