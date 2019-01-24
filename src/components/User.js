import React, { Component } from "react";
import Photo from "../images/kosmo.png";
import "../styles/user.css";

export default class User extends Component {
  info = {
    name: "Косматкин Геннадий Юрьевич",
    phone: "+79162349506",
    site: "www.kosmo.org",
    email: "kosmo@gmail.com"
  };

  render() {
    return (
      <section className="user-info">
        <header className="user-info__header">
          <img className="user-info__photo" src={Photo} alt="user photo" />
          <span className="user-info__name">Индивидуальный предприниматель {this.info.name}</span>
        </header>
        <p className="contacts">
          <span className="contacts__phone">{this.info.phone} </span>
          <a className="contacts__site" href={"http://" + this.info.site}>
            {this.info.site + " "}
          </a>
          <a className="contacts__mail" href={"mailto:" + this.info.email}>
            {this.info.email + " "}
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
