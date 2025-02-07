import { GlobalStyle, AppContainer, Column, Row, Button, ButtonRegLogin } from "../styles";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const CheckHelper = (jsonData) => {
  document.getElementById("textGet").value = String(jsonData.data);
  document.getElementById("plagResult").textContent = jsonData.score.toFixed(1) + "%";
  if (jsonData.score > 20) {
    document.getElementById("plagResult").style.color = "#e3161d";
  }
  else {
    document.getElementById("plagResult").style.color = "#47e316";
  }
  if (jsonData.score === 0) {
    document.getElementById("links").style.display = "none";
    document.getElementById("linksTitle").style.display = "none";
  }
  else {
    const linksArray = String(jsonData.links + ",").split(",");
    const container = document.getElementById("links");

    linksArray.forEach((link, index) => {
      const a = document.createElement("a");
      a.href = link;
      a.textContent = link;
      a.target = "_blank";
      a.style.color = "#3b88cb";

      container.appendChild(a);
      if (index < linksArray.length - 2) {
        let textNode = document.createTextNode(", ");
        let span = document.createElement("span");
        span.appendChild(textNode);
        span.style.color = "#3b88cb";
        container.appendChild(span);
      }

    });
  }
  document.getElementById("checker").style.display = "none";
  document.getElementById("result").style.display = "flex";
}

const Home = () => {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (localStorage.length !== 0) {
      let newHistory = [];

      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);

        try {
          let parsedItem = JSON.parse(item);
          newHistory.push(String(parsedItem.data)+key);
        } catch {}
      }
      setHistory(newHistory);
    }
  }, []);

  const [buttonText, setButtonText] = useState("|");
  const [isLeftBlockVisible, setIsLeftBlockVisible] = useState(true);
  const handleMouseOver = () => setButtonText("⟨");
  const handleMouseOut = () => setButtonText("|");
  const toggleLeftBlock = () => setIsLeftBlockVisible(!isLeftBlockVisible);

  const handleSubmit = async () => {
    const keyGet = document.getElementById("keyGet");
    const textGet = document.getElementById("textGet");
    const submitButton = document.getElementById("submitButton");
    submitButton.textContent = "Завантаження...";
    try {
      const response = await fetch("https://api-termochromic-v2-cloud-virtualintelligence.vercel.app/api/submitText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key_cse: keyGet.value, text: textGet.value }),
      });

      if (response.ok) {
        const jsonData = await response.json();
        CheckHelper(jsonData);
        if (localStorage.length === 0) {
          localStorage.setItem("1", JSON.stringify(jsonData));
        }
        else localStorage.setItem(parseInt(localStorage.key(localStorage.length - 1)) + 1, JSON.stringify(jsonData));
      } else {
        alert("Помилка під час надсилання!");
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося відправити дані.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Column
          flex="0 0 230px"
          backgroundColor="#1c1c1c"
          display={isLeftBlockVisible ? "block" : "none"}
        >
          <Row flex="0 0 30px"> <img src="add.png" onClick={() => window.location.reload()} width="160px" style={{ paddingTop: "13px" }}></img> </Row>
          <Row style={{ height: "590px", alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "column"}}>
            {history.map((text, index) => (
              <div style={{display: "flex", flexDirection: "row", alignItems: "baseline" }}>
                  <div style={{flex: "1"}}>
                    <Button key={index} onClick={(e) => CheckHelper(JSON.parse(localStorage.getItem(localStorage.key(e.target.textContent.trim().slice(-1)))))} style={{fontSize: "17px", textAlign: "left", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "168px"}}>
                      {text}
                    </Button>
                  </div>
                  <div>
                    <Button onClick={(e) => localStorage.clear() & e.target.parentNode.parentNode.remove()}>
                      x
                    </Button>
                  </div>
              </div>
          
            ))}
          </Row>
          <Row flex="0 0 30px"><Button onClick={() => Cookies.remove("authToken") & window.location.reload()} style={{ paddingLeft: "70px" }}>Logout</Button></Row>
        </Column>
        <Column flex="1" style={{ padding: "35px !important" }}>
          <Row style={{ height: "47px" }}>
            <Column flex="0 0 20px">
              <Button
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={toggleLeftBlock}
              >
                {buttonText}
              </Button>
            </Column>
            <Column flexGrow={1} />
          </Row>
          <Row flexGrow={1} >
            <textarea id="textGet" style={{ fontSize: "17px", whiteSpace: "pre-line", color: "whitesmoke", margin: "50px", padding: "15px", height: "100%", width: "100%", background: "#2c2c2c", outline: "none", borderRadius: "30px", resize: "none", boxShadow: "10px 0 10px rgba(0.1, 0.1, 0.1, 0.1)" }}
              defaultValue={`Мені тринадцятий минало, купив собі я жигулі,
Мені так любо-любо стало, шо я врізався в таксі,
Мене міліція шукає, а я сиджу у гаражі,
Бутилку водки допиваю і ремонтую жигулі.`} />
          </Row>
          <Row>
            <div style={{ fontSize: "17px", whiteSpace: "pre-line", color: "whitesmoke", margin: "50px", padding: "15px", marginTop: "20px", marginBottom: "20px", height: "100px", width: "100%", background: "#2c2c2c", borderRadius: "30px", resize: "none", boxShadow: "10px 0 10px rgba(0.1, 0.1, 0.1, 0.1)" }}>

              <div id="result" style={{ display: "none", height: "100vh" }}>
                <div style={{ flexGrow: "1" }}>
                  <p style={{ fontSize: "20px", margin: "10px" }}>Плагіат: </p>
                  <p id="plagResult" style={{ fontSize: "40px", margin: "10px" }}>0%</p>
                </div>
                <div style={{ width: "850px" }}>
                  <p id="linksTitle" style={{ fontSize: "20px", margin: "10px" }}>Посилання на джерела: </p>
                  <p id="links" style={{ wordBreak: "break-all", fontSize: "14px", margin: "10px" }}></p>
                </div>
              </div>

              <div id="checker" style={{ display: "flex", height: "100vh", alignContent: "center" }}>
                <div style={{ flexGrow: "1" }}>
                  <p style={{ fontSize: "20px", margin: "10px" }}>Ключ Google Search API:</p>
                  <input
                    type="text"
                    id="keyGet"
                    defaultValue="4603a790b814d4a35:AIzaSyDy8KWEz3iDy3RUeJuE8ly8uYc1nPWgAto"
                    style={{
                      backgroundColor: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      padding: "10px",
                      width: "300px",
                      borderRadius: "3px",
                      marginLeft: "10px",
                    }}
                  />
                </div>
                <div style={{ width: "150px" }}>
                  <ButtonRegLogin
                    id="submitButton"
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#fd5c6d",
                      marginTop: "25px"
                    }}
                  >
                    Перевірити
                  </ButtonRegLogin>
                </div>
              </div>
            </div>
          </Row>
        </Column>
      </AppContainer>
    </>
  );
}

export default Home;
