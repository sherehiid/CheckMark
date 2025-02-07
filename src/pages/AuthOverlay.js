import React from "react";
import { useNavigate } from "react-router-dom";

const AuthOverlay = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.text}>Доступно тільки авторизованим користувачам</h2>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Увійти
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  text: {
    color: "#fff",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AuthOverlay;
