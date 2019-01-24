import React, { Component } from "react";

export default class CardPay extends Component {
  render() {
    return (
      <form className="payment-form">
        <p className="field">
          <label for="cardNo">Номер карты: </label>
          <input
            type="text"
            className="payment-form__field"
            id="cardNo"
            pattern="\d{16}"
            placeholder="1234567891011112"
          />
        </p>
        <p className="field">
          <label for="sum">Сумма перевода: </label>
          <input
            type="text"
            className="payment-form__field"
            id="sum"
            pattern="(^[1-9]\d\d\d$)|(^[0-6]\d\d\d\d$)|(^7[0-5]\d\d\d$)"
            placeholder="от 1000 до 75000"
          />
        </p>
        <p className="field">
          <label for="cardExpDate">Срок действия карты:</label>
          <input
            className="payment-form__field"
            id="cardExpDate"
            type="text"
            pattern="^(0\d)|(1[0-2])/(1[7-9])|(2\d)|(3[0-5])$"
            placeholder="ММ/ГГ"
          />
        </p>
        <p className="field">
          <label for="cvc">CVC:</label>
          <input
            className="payment-form__field"
            id="cvc"
            type="text"
            pattern="^\d{3}$"
            placeholder="123"
          />
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
        <p className="field">
          <label for="comment">Комментарий:</label>
          <input
            className="payment-form__field"
            id="comment"
            type="text"
            maxLength="150"
            placeholder="Не более 150 символов"
          />
        </p>

        <input className="payment-form__submit" type="submit" value="Заплатить" />
        <input className="payment-form__reset" type="reset" value="Очистить форму" />
      </form>
    );
  }
}
