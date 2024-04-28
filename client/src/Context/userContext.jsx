import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/");
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
