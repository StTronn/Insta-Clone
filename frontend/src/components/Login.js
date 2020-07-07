import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Store } from "../store";
import { URL } from "../utils";

export const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  padding: 1rem;
  width: 350px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 6rem auto;
  text-align: center;
  padding: 2rem 0;
  img {
    margin-bottom: 1.5rem;
  }
  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0.5rem 1.2rem;
    background: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    width: 85%;
  }
  input[type="submit"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.blue};
    cursor: pointer;
  }
  p {
    margin-top: 2rem;
  }
  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }
`;

const Login = (props) => {
  const { from } = props.location.state || { from: { pathname: "/" } };
  const { state, dispatch } = useContext(Store);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //make the login req
  const fetchLoginResult = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(URL + "/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      //if response.status ===403 message
      if (response.status === 403) {
        setErrorMessage(
          "your email and password didn't match. New Create an account"
        );
        return;
      }
      const data = await response.json();
      console.log(data);
      dispatch({ type: "SET_USER", payload: data.user });
    } catch (err) {}
  };

  from.pathname = from.pathname.startsWith("/user")
    ? `/user/${state.user.username}`
    : from.pathname;
  if (state.user === false)
    return (
      <FormWrapper>
        <img className="logo" src={logo} alt="logo" />
        <form
          onSubmit={(e) => {
            fetchLoginResult(e);
          }}
        >
          <label>
            email:
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              name="name"
            />
          </label>
          <br />

          <label>
            password:
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="name"
            />
          </label>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <input
            disabled={email === "" || password === ""}
            type="submit"
            value="Submit"
          />
        </form>
      </FormWrapper>
    );
  else return <Redirect to={from} />;
};

export default Login;
