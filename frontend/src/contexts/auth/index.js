import React, { createContext, useReducer } from "react";

const initialStates = {
  isAuth:
    localStorage.getItem("isAuth") || sessionStorage.getItem("isAuth") || false,
  accessToken:
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
  requests: [],
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          isAuth: true,
          accessToken: action.payload.accessToken,
          user: action.payload.user,
          requests: [],
        };

      case "logout":
        localStorage.clear();
        sessionStorage.clear();
        return { isAuth: false, accessToken: null, user: null, requests: [] };

      case "updateAvatar":
        const userWithNewAvatar = { ...state.user, avatar: action.payload };

        if (localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify(userWithNewAvatar));
        }

        if (sessionStorage.getItem("user")) {
          sessionStorage.setItem("user", JSON.stringify(userWithNewAvatar));
        }

        return {
          ...state,
          user: userWithNewAvatar,
        };

      case "setRequests":
        return {
          ...state,
          requests: action.payload.requests,
          user: { ...state.user, courses: action.payload.courses },
        };

      default: {
        return { ...initialStates };
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
