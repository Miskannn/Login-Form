import React, { Dispatch, SetStateAction, useState } from "react";

type AuthContextType = {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
}


export const AuthContext = React.createContext<AuthContextType>({userEmail: "", setUserEmail: () => console.warn("setUserEmail is not defined")});

const AuthProvider: React.FC = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
