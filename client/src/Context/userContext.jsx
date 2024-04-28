import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  //Function to fetch user data
  const fetchUser = async () => {
    const response = await fetch("https://findyourjob.up.railway.app/profile", {
      credentials: "include",
    });
    const data = await response.json();
    setUser(data);
  };

  const Logout = async () => {
    try {
      const response = await fetch(
        "https://findyourjob.up.railway.app/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, Logout }}>
      {children}
    </UserContext.Provider>
  );
};
