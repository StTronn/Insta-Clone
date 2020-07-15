import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import Login from "./components/Login";
import { ThemeContext } from "./context/ThemeContext";
import Register from "./components/Register";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import DetailedPost from "./components/DetailedPost";

import PrivateRoute from "./components/PrivateRouter";
import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Router>
          <div>
            <Nav />
          </div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user/:username" component={Profile} />
            <Route path="/p/:postId" component={DetailedPost} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </StyledThemeProvider>
  );
}

export default App;
