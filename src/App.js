import React, { Component } from "react";
import User from "./components/User";
import Payment from "./components/Payment/Payment.js";
import "./styles/App.css";
import AboutCompany from "./components/company/AboutCompany";
import Footer from "./components/Footer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
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

export default App;
