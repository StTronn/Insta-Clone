import React, { useContext, useState } from "react";
import { Store } from "../store";
import { URL } from "../utils";

const Login = () => {
  const { dispatch } = useContext(Store);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      dispatch({ type: "SET_TOKEN", payload: data.token });
    } catch (err) {
      console.log(err.statusCode);
    }
  };
  return (
    <>
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
        <br />
        <p style={{ color: "red" }}>{errorMessage}</p>
        <br />
        <input
          disabled={email === "" || password === ""}
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default Login;
