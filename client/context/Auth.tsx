import React, { Dispatch, SetStateAction, useState } from "react";

interface AuthContextInterface{
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
}

interface AuthProviderProps{
  children: React.ReactNode | React.ReactChild;
}

export const AuthContext = React.createContext<AuthContextInterface>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
