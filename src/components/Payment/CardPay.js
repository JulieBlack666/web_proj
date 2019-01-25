import React, { Component } from "react";

export default class CardPay extends Component {
  state = {
    cardNo: "",
    sum: "",
    cardExpDate: "",
    cvc: "",
    mail: "",
    comment: "",

    isValid: {
      cardNo: false,
      sum: false,
      cardExpDate: false,
      cvc: false,
      mail: false,
      comment: true
    }
  };

  checks = {
    cardNo: x => /^\d{16}$/.test(x),
    sum: x => Number(x) >= 1000 && Number(x) <= 75000,
    cardExpDate: x => {
      const splitted = x.split("/").map(e => parseInt(e));
      return splitted[0] >= 1 && splitted[0] <= 12 && splitted[1] >= 17 && splitted[1] <= 35;
    },
    cvc: x => /^\d{3}$/.test(x),
    mail: x => /[a-zA-Z1-9]+@[a-z]+\.[a-z]+$/.test(x),
    comment: x => x.length <= 150
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
      <form className="payment-form">
        <p className="field">
          {this.isFormValid()}
          <label for="cardNo">Номер карты: </label>
          <input
            type="text"
            name="cardNo"
            className={"payment-form__field " + this.getClass("cardNo")}
            id="cardNo"
            pattern="\d{16}"
            placeholder="1234567891011112"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="sum">Сумма перевода: </label>
          <input
            type="text"
            name="sum"
            className={"payment-form__field " + this.getClass("sum")}
            id="sum"
            pattern="(^[1-9]\d\d\d$)|(^[0-6]\d\d\d\d$)|(^7[0-5]\d\d\d$)"
            placeholder="от 1000 до 75000"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="cardExpDate">Срок действия карты:</label>
          <input
            className={"payment-form__field " + this.getClass("cardExpDate")}
            name="cardExpDate"
            id="cardExpDate"
            type="text"
            pattern="^(0\d)|(1[0-2])/(1[7-9])|(2\d)|(3[0-5])$"
            placeholder="ММ/ГГ"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="cvc">CVC:</label>
          <input
            className={"payment-form__field " + this.getClass("cvc")}
            name="cvc"
            id="cvc"
            type="text"
            pattern="^\d{3}$"
            placeholder="123"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="mail">Email:</label>
          <input
            className={"payment-form__field " + this.getClass("mail")}
            name="mail"
            id="mail"
            type="email"
            placeholder="proverka@example.com"
            onChange={this.handleInput}
          />
        </p>
        <p className="field">
          <label for="comment">Комментарий:</label>
          <input
            className={"payment-form__field " + this.getClass("comment")}
            name="comment"
            id="comment"
            type="text"
            maxLength="150"
            placeholder="Не более 150 символов"
            onChange={this.handleInput}
          />
        </p>

        <input
          className="payment-form__submit"
          type="submit"
          value="Заплатить"
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
