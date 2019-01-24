import React, { Component } from "react";
import User from "./components/User";
import Payment from "./components/Payment/Payment.js";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <User />
        <hr />
        <Payment />
        <hr />
      </div>
    );
  }
}

export default App;
