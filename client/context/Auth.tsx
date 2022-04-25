import React, { Dispatch, SetStateAction, useState } from "react";

export type AuthContextType = {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
}


export const AuthContext = React.createContext<AuthContextType | null>(null);
AuthContext.displayName = 'AuthContext';

const AuthProvider: React.FC = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
