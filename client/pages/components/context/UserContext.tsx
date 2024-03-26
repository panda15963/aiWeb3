// Interface for UserContextProps
import React, { createContext, useContext, useState } from 'react';

interface UserContextPropsInterface {
  user: string | null;
  login: (newUser: string) => void;
  logout: () => void;
}
 
// Create a context called UserContext with UserContextProps as its type
const UserContext = createContext<UserContextPropsInterface>({
  user: null,
  login: () => {},
  logout: () => {},
});
 
// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
 
 // UserProvider component
 // This component uses the useState hook to manage the user state
 // and provides the user, login, and logout functions as values for the UserContext
 export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
 
  // login function
  const login = (newUser: string) => {
    setUser(newUser);
  };
 
  // logout function
  const logout = () => {
    setUser(null);
  };
 
  // Provide the UserContext with an object containing user, login, and logout functions
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
 };
 
 export default UserProvider;