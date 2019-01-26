import React, { Component } from "react";
import User from "./components/User";
import Payment from "./components/Payment/Payment.js";
import "./styles/App.css";
import AboutCompany from "./components/company/AboutCompany";
import Footer from "./components/Footer.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/main-page";
import Admin from "./components/admin/Admin";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route path="/main" component={MainPage} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
