import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial app load
  useEffect(() => {
    const loadStoredAuth = () => {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if(savedToken && savedUser !== "null" && savedToken !== "undefined"){
        setToken(savedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
      }

      if(savedUser && savedUser !=="null" && savedUser !== "undefined"){
        try {
          setUser(JSON.parse(savedUser));
        }catch(e){
          console.error("Invalid user data in localStorage");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    }
    loadStoredAuth();
  }, []);


  // LOGIN FUNCTION (your existing code moved here)
  const login = async (email, password) => {
    try{
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      
      const {token, user} = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      setUser(user);
      setToken(token);
  
      return response.data;
    }catch(error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    delete axios.defaults.headers.common["Authorization"];
    
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
