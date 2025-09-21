/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

// Minimal stub to satisfy imports during prototype stage
const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  // No-op provider for now
  return (
    <AuthContext.Provider value={{ user: null, signIn: async () => {}, signOut: async () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
