import React, { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
  
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user?._id;
  
      fetch(`http://localhost:5000/api/details/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            setCurrentUser({ ...data.user, role: data.user.role });
          } else {
            console.log("Invalid user data", data);
            logout();
          }
        })
        .catch((err) => {
          console.error("Error validating token:", err);
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]);
  

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
  
      if (!response.ok) throw new Error("Login failed");
  
      const data = await response.json();
      if (!data.token || !data.user) throw new Error("Invalid login response");
  
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      setCurrentUser({ ...data.user, role: data.user.role }); // ✅ Ensure role is set
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

