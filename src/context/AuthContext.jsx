import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "medinova_users";
const SESSION_KEY = "medinova_session";

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  const register = ({ fullName, email, phone, password }) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser = { fullName, email, phone, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    return { success: true };
  };

  const login = ({ email, password, remember }) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: "Invalid email or password." };
    }
    const sessionUser = { fullName: found.fullName, email: found.email, phone: found.phone };
    if (remember) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    }
    setUser(sessionUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
