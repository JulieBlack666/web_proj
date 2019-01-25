import React, { Component } from "react";

export default class BankPay extends Component {
  state = {
    inn: "",
    sum: "",
    bik: "",
    for: "",

    isValid: {
      inn: false,
      sum: false,
      bik: false,
      for: false
    }
  };

  checks = {
    inn: x => (x.length === 10 || x.length === 12) && !isNaN(x),
    sum: x => Number(x) >= 1000 && Number(x) <= 75000,
    bik: x => /^\d{9}$/.test(x),
    for: x => /.*(без НДС)|(НДС 18%)|(НДС 10%)/.test(x)
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
      <form className="payment-form" action="/bank_payment" method="post">
        <p className="field">
          <label for="INN">От кого: </label>
          <input
            type="text"
            className={"payment-form__field " + this.getClass("inn")}
            name="inn"
            id="INN"
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
            name="bik"
            id="BIK"
            pattern="^\d{9}$"
            placeholder="123456789"
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

        <input
          className="payment-form__submit"
          type="submit"
          value="Получить файл для интернет-банка"
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
