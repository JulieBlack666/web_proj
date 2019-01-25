import React, { Component } from "react";
import Photo from "../images/kosmo.png";
import "../styles/user.css";

export default class User extends Component {
  state = {
    name: "",
    phone: "",
    site: "",
    email: ""
  };

  componentDidMount() {
    fetch("/api/user_info")
      .then(res => res.json())
      .then(res => this.setState(res))
      .catch(console.error());
  }

  render() {
    return (
      <section className="user-info">
        <header className="user-info__header">
          <img className="user-info__photo" src={Photo} alt="user photo" />
          <span className="user-info__name">Индивидуальный предприниматель {this.state.name}</span>
        </header>
        <p className="contacts">
          <span className="contacts__phone">{this.state.phone} </span>
          <a className="contacts__site" href={"http://" + this.state.site}>
            {this.state.site + " "}
          </a>
          <a className="contacts__mail" href={"mailto:" + this.state.email}>
            {this.state.email + " "}
          </a>
        </p>
        <a className="user-info__company" href="#">
          Информация о компании
        </a>
        <br />
        <a className="user-info__requisites" href="#">
          Показать реквизиты
        </a>
      </section>
    );
  }
}
