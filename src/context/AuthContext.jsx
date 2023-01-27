import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const memoisedUser = useMemo(() => ({ user, setUser }));

  return (
    <AuthContext.Provider value={memoisedUser}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
