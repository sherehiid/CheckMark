import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body, html {
    position: relative;
    margin: 0;
    height: 100%;
    background: #212121;
    color: #dbdbdb;
    font-family: Arial;
    font-size: 12pt;
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
  }

  body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 0.5px solid #35383f;
    border-radius: 20px;
    pointer-events: none;
    box-sizing: border-box;
    overflow: hidden;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #dadada;
  font-size: 19px;
  font-weight: bold;
  padding: 10px 15px;
  &:hover {
    color: #ffffff;
  }
`;
export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #0C8CE9;
  border-radius: 5px;
  background-color: #212121;
  color: white;
  font-size: 1.2rem;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

export const ButtonRegLogin = styled.button`
  padding: 0.7rem;
  color: white;
  border: none;
  border-radius: 20px;
  background-color: #2c2c2c;
  border: 1px solid #212121;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;

  &:hover {
    border: 1px solid #444;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ display }) => display && `display: ${display};`}
`;

export const Row = styled.div`
  display: flex;
  padding: 10px;
  ${({ flex }) => flex && `flex: ${flex};`}
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  align-items: center;
  justify-content: space-between;
`;