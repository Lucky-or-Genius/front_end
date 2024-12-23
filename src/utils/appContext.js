import React, { useEffect, createContext, useContext, useState } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { userLogin } from "../services/login.service";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const updateUserState = async (userInfo) => {
    try {
      const response = await userLogin(userInfo);
      const accountId = response.data.account_id;
      localStorage.setItem("accountId", accountId);
      localStorage.setItem("userdata", JSON.stringify(userInfo));

      // Update user state with accountId
      setUser({
        ...userInfo,
        accountId,
      });
    } catch (error) {
      console.error("Error creating or updating user:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        localStorage.setItem(
          "token",
          JSON.stringify(tokenResponse.access_token)
        );

        // Fetch user information from Google
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await response.json();

        // Update user info in state and backend
        await updateUserState({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          given_name: userInfo.given_name,
        });

        // navigate("/dashboard/Feed");
        return Promise.resolve(); // Indicate login completion
      } catch (error) {
        console.error("Error during login:", error);
        return Promise.reject(error); // Indicate login failure
      }
    },
  });

  const logout = () => {
    googleLogout();
    // Clear all user-related data
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    localStorage.removeItem("accountId");
    setUser(null); // Reset the user state
    navigate("/"); // Navigate to homepage
  };

  useEffect(() => {
    // Initialize user state from localStorage if data exists
    const token = localStorage.getItem("token");
    const userdata = localStorage.getItem("userdata");
    const accountId = localStorage.getItem("accountId");

    if (token && userdata) {
      const parsedUserdata = JSON.parse(userdata);
      setUser({
        ...parsedUserdata,
        accountId,
      });
    }
  }, []);

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, useAppContext, AppContextProvider };
