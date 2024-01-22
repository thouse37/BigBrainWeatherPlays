import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    avatar: localStorage.getItem("avatar"),
  });

  const login = (token, avatar) => {
    localStorage.setItem("token", token);
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
    setAuth({ token, avatar });
  };

  // Update the logout function to clear additional user details
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    setAuth({});
  };

  const updateAvatar = (newAvatar) => {
    localStorage.setItem("avatar", newAvatar);
    setAuth((prevAuth) => ({ ...prevAuth, avatar: newAvatar }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
