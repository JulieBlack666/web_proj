import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Redirect } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar__first-row">
          <NavLink to="/pay" activeClassName="link-selected" className="navbar__choice">
            Заплатить
          </NavLink>{" "}
          <NavLink to="/request_payment" activeClassName="link-selected" className="navbar__choice">
            Запросить&nbsp;платёж
          </NavLink>
        </div>
        <Route
          path="/pay"
          component={() => (
            <div className="navbar__second-row">
              <NavLink
                to="/pay/using_card"
                activeClassName="second-selected link-selected"
                className="navbar__choice-second navbar__from-card-choice"
              >
                💳&nbsp;С&nbsp;карты&nbsp;любого&nbsp;банка
              </NavLink>{" "}
              <NavLink
                to="/pay/using_online_bank"
                activeClassName="second-selected link-selected"
                className="navbar__choice-second navbar__from-internet-bank-choice"
              >
                💻&nbsp;Из&nbsp;своего&nbsp;интернет&#8209;банка
              </NavLink>
            </div>
          )}
        />
      </div>
    );
  }
}
