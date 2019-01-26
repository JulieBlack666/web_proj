import React, { Component } from "react";
import User from "./User";
import Payment from "./Payment/Payment.js";
import AboutCompany from "./company/AboutCompany";
import Footer from "./Footer.js";
import { BrowserRouter, Route, NavLink, Redirect } from "react-router-dom";

export default class MainPage extends Component {
  render() {
    return (
      <div className="App">
        <NavLink to="/admin" activeClassName="link-selected" className="adm__choice">
          Админ-панель
        </NavLink>{" "}
        <User />
        <hr />
        <Payment />
        <hr />
        <AboutCompany />
        <Footer />
      </div>
    );
  }
}
