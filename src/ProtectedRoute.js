import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


const isTokenValid = () => {
  const token = Cookies.get("authToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      Cookies.remove("authToken");
      navigate("/not-registered");
    }
  }, [navigate]);

  return isTokenValid() ? children : null;
};

export default ProtectedRoute;