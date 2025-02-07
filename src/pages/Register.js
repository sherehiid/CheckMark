import React, { useState } from "react";
import { GlobalStyle, AppContainer, Column, Row, ButtonRegLogin, Input } from "../styles";
import { auth } from "./firebase";
import Cookies from "js-cookie";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Паролі не співпадають!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      Cookies.set("authToken", token, { expires: 9999, secure: true });
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Column flex="0 0 650px" backgroundColor="#2c2c2c" style={{
          borderTopRightRadius: "70px",
          borderBottomRightRadius: "70px",
          boxShadow: "10px 0 10px rgba(0, 0, 0, 0.1)"
        }}>
          <Row flex="1 0 0" style={{}}>
            <img src="Logo.png" width="240px" style={{paddingLeft: "30px"}}></img> 
          </Row>
          
          <center><label style={{ width: "150px", fontSize: "30px" }}>Registration</label></center>

          <Row flexGrow={1} style={{
                flexDirection: "column",
                justifyContent: "center"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <form onSubmit={handleRegister}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ width: "150px", textAlign: "left" }}>Email:</label>
                <Input
                  type="email"
                  value={email}
                  placeholder="user@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ width: "150px", textAlign: "left" }}>Password:</label>
                <Input
                  type="password"
                  value={password}
                  placeholder="•••••••••••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ width: "150px", textAlign: "left" }}>Confirm password:</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  placeholder="•••••••••••••••••••••"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <ButtonRegLogin type="submit" style={{width: "120px", marginTop: "30px"}}>Register</ButtonRegLogin>
            </form>
            </div>
          </Row>
          <ButtonRegLogin onClick={() =>window.location.href = "./login"} style={{marginRight: "100px", borderColor: "#2c2c2c", width: "130px", marginTop: "30px"}}>Login<img width="50px" src="img_dn.png"/></ButtonRegLogin>

          <Row flex="0 0 30px" />
        </Column>
        <Column flexGrow={1} style={{
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingTop: "17px",
          paddingBottom: "17px"
        }}>
          <img src="mscreen.png" style={{
            height: "100%",
            objectFit: "cover"
          }}/>
        </Column>
      </AppContainer>
    </>
  );
};

export default Registration;
