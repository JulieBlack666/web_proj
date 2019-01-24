import React, { Component } from "react";

export default class RequirePay extends Component {
  render() {
    return (
      <form className="payment-form">
        <p className="field">
          <label for="INN">ИНН получателя: </label>
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
          <label for="accountNo">Номер счёта:</label>
          <input
            className="payment-form__field"
            id="accountNo"
            type="text"
            pattern="^\d{20}$"
            placeholder="12345678910111213141"
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
        <p className="field">
          <label for="phone">Телефон:</label>
          <input className="payment-form__field" id="phone" type="tel" placeholder="+7" />
        </p>
        <p className="field">
          <label for="mail">Email:</label>
          <input
            className="payment-form__field"
            id="mail"
            type="email"
            placeholder="proverka@example.com"
          />
        </p>

        <input className="payment-form__submit" type="submit" value="Создать платёж" />
        <input className="payment-form__reset" type="reset" value="Очистить форму" />
      </form>
    );
  }
}
