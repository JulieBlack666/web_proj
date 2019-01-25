import React, { Component } from "react";
import InputMask from "react-input-mask";

export default class RequirePay extends Component {
  state = {
    inn: "",
    sum: "",
    bik: "",
    for: "",
    mail: "",
    tel: "",
    acc: "",

    isValid: {
      inn: false,
      sum: false,
      bik: false,
      for: false,
      mail: false,
      tel: false,
      acc: false
    }
  };

  checks = {
    inn: x => (x.length === 10 || x.length === 12) && !isNaN(x),
    bik: x => /^\d{9}$/.test(x),
    for: x => /.*(без НДС)|(НДС 18%)|(НДС 10%)/.test(x),
    sum: x => Number(x) >= 1000 && Number(x) <= 75000,
    mail: x => /[a-zA-Z1-9]+@[a-z]+\.[a-z]+$/.test(x),
    acc: x => /^\d{20}$/.test(x),
    tel: x => /^\+7 9\d\d \d{3}-\d{2}-\d{2}$/.test(x)
  };

  handleInput = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    this.setState({ [name]: val });
    this.state.isValid[name] = this.checks[name](val);
  };

  getClass = elName => {
    return this.state.isValid[elName] ? "green" : "red";
  };

  isFormValid = () => {
    for (const key in this.state.isValid) {
      if (!this.state.isValid[key]) {
        return false;
      }
    }
    return true;
  };

  clearState = () => {
    for (const key in this.state) {
      if (this.state[key] !== "" && key !== "isValid") {
        this.setState({ [key]: "" });
        this.state.isValid[key] = false;
      }
    }
  };

  render() {
    return (
      <form className="payment-form" action="/req_payment" method="post">
        <p className="field">
          <label for="INN">ИНН получателя: </label>
          <input
            type="text"
            className={"payment-form__field " + this.getClass("inn")}
            id="INN"
            name="inn"
            pattern="^(\d{10})|(\d{12})$"
            placeholder="ИНН"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="BIK">БИК: </label>
          <input
            type="text"
            className={"payment-form__field " + this.getClass("bik")}
            id="BIK"
            name="bik"
            pattern="^\d{9}$"
            placeholder="123456789"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="accountNo">Номер счёта:</label>
          <input
            className={"payment-form__field " + this.getClass("acc")}
            id="accountNo"
            name="acc"
            type="text"
            pattern="^\d{20}$"
            placeholder="12345678910111213141"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="forWhat">За что:</label>
          <input
            className={"payment-form__field " + this.getClass("for")}
            id="forWhat"
            name="for"
            type="text"
            pattern=".*(без НДС)|(НДС 18%)|(НДС 10%)"
            placeholder="НДС 18%"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="sum">Сколько: </label>
          <input
            type="text"
            className={"payment-form__field " + this.getClass("sum")}
            id="sum"
            name="sum"
            pattern="(^[1-9]\d\d\d$)|(^[0-6]\d\d\d\d$)|(^7[0-5]\d\d\d$)"
            placeholder="от 1000 до 75000"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="phone">Телефон:</label>
          <InputMask
            mask="+7 999 999-99-99"
            className={"payment-form__field " + this.getClass("tel")}
            id="phone"
            name="tel"
            type="tel"
            onChange={this.handleInput}
            placeholder="+7 999 999-99-99"
          />
        </p>
        <p className="field">
          <label for="mail">Email:</label>
          <input
            className={"payment-form__field " + this.getClass("mail")}
            id="mail"
            name="mail"
            type="email"
            placeholder="proverka@example.com"
            onChange={this.handleInput}
          />
        </p>

        <input
          className="payment-form__submit"
          type="submit"
          value="Создать платёж"
          disabled={!this.isFormValid()}
        />
        <input
          className="payment-form__reset"
          type="reset"
          value="Очистить форму"
          onClickCapture={this.clearState}
        />
      </form>
    );
  }
}
