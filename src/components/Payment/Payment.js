import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BankPay from "./BankPay.js";
import CardPay from "./CardPay.js";
import RequirePay from "./RequirePay.js";
import Navigation from "./Navigation.js";
import "../../styles/Payment.css";

export default class Payment extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div className="box-wrapper">
          <Navigation />
          <Switch>
            <Redirect exact from="/" to="/pay" />
            <Route path="/pay/using_online_bank" component={BankPay} />
            <Route path="/request_payment" component={RequirePay} />
            <Route path="/pay/using_card" component={CardPay} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
