import React, { Component } from "react";

export default class BankPay extends Component {
  render() {
    return (
      <form className="payment-form">
        <p className="field">
          <label for="INN">От кого: </label>
          <input
            type="text"
            className="payment-form__field"
            id="INN"
            pattern="^(\d{10})|(\d{12})$"
            placeholder="ИНН"
          />
        </p>
        <p className="field">
          <label for="BIK">БИК: </label>
          <input
            type="text"
            className="payment-form__field"
            id="BIK"
            pattern="^\d{9}$"
            placeholder="123456789"
          />
        </p>
        <p className="field">
          <label for="forWhat">За что:</label>
          <input
            className="payment-form__field"
            id="forWhat"
            type="text"
            pattern=".*(без НДС)|(НДС 18%)|(НДС 10%)"
            placeholder="НДС 18%"
          />
        </p>
        <p className="field">
          <label for="sum">Сколько: </label>
          <input
            type="text"
            className="payment-form__field"
            id="sum"
            pattern="(^[1-9]\d\d\d$)|(^[0-6]\d\d\d\d$)|(^7[0-5]\d\d\d$)"
            placeholder="от 1000 до 75000"
          />
        </p>

        <input
          className="payment-form__submit"
          type="submit"
          value="Получить файл для интернет-банка"
        />
        <input className="payment-form__reset" type="reset" value="Очистить форму" />
      </form>
    );
  }
}
