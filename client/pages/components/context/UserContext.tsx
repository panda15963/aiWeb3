import { createContext, useContext, useState } from "react";

// Interface for UserContextProps
// This interface defines the shape of the UserContextProps object
// which includes a user property (a string or null), and two functions: login and logout
interface UserContextProps {
 user: string | null;
 login: (user: string) => void;
 logout: () => void;
}

// Create a context called UserContext with UserContextProps as its type
const UserContext = createContext<UserContextProps>({
 user: null,
 login: () => {}, // Default implementation for login function
 logout: () => {}, // Default implementation for logout function
});

// Custom hook to use UserContext
// This hook allows child components to easily access the UserContext values
export const useUser = () => useContext(UserContext);

// UserProvider component
// This component uses the useState hook to manage the user state
// and provides the user, login, and logout functions as values for the UserContext
export const UserProvider = ({ children }: any) => {
 const [user, setUser] = useState<string | null>(null);

 // login function
 // This function takes a newUser as an argument and updates the user state
 const login = (newUser: string) => {
   setUser(newUser);
 };

 // logout function
 // This function resets the user state to null
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