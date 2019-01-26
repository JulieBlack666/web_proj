import React, { Component } from "react";
import "./admin.css";

export default class Admin extends Component {
  state = {
    table: [],
    desc: false,
    filter: "",
    field: "",
    sort_field: ""
  };

  keyNames = {
    _id: "Идентификатор",
    cardNo: "Номер карты",
    cvc: "cvc",
    cardExpDate: "Действует до",
    sum: "Сумма платежа",
    comment: "Комментарий",
    bik: "БИК",
    inn: "ИНН",
    acc: "Номер счёта",
    for: "Что оплачено",
    tel: "Телефон",
    mail: "Почта",
    trusted: "Безопасность"
  };

  renderTable() {
    if (this.state.table.length === 0) {
      return <div> Значения отсутствуют</div>;
    }

    if (this.state.error) {
      return <div> Где-то ошибка</div>;
    }
    const headers = Object.keys(this.state.table[0])
      .filter(e => typeof this.keyNames[e] !== "undefined")
      .map(e => this.keyNames[e]);

    return (
      <table border="1">
        <tr>
          {headers.map(h => (
            <th>{h}</th>
          ))}
        </tr>
        {this.state.table.map(e => (
          <tr bgcolor={e["trusted"] === true ? "white" : "red"}>
            {Object.keys(e)
              .filter(x => typeof this.keyNames[x] !== "undefined")
              .map(key => (
                <td>
                  {key === "trusted" ? (
                    <button onClick={() => this.makeUntrusted(e["_id"])}>Unsafe</button>
                  ) : (
                    e[key]
                  )}{" "}
                </td>
              ))}
          </tr>
        ))}
      </table>
    );
  }

  makeUntrusted(id) {
    alert("Пожалуйста, подтвердите, что платёж небезопасен");
    fetch(this.state.paymentMethod, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: `id=${id}`
    });
    this.createTable.call(this);
  }

  handleInput = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    this.setState({ [name]: val });
  };

  handleCheck = evt => {
    this.setState({ desc: !this.state.desc });
  };

  getFilters() {
    const order = this.state.desc ? "desc" : "asc";
    return this.state.filter !== "" && this.state.field !== ""
      ? `?filter=${this.state.filter}&field=${this.state.field}`
      : this.state.sort_field !== ""
      ? `?sort=${order}&field=${this.state.sort_field}`
      : "";
  }

  createTable() {
    fetch(this.state.paymentMethod + this.getFilters())
      .then(res => res.json())
      .then(res => this.setState({ table: res }))
      .catch(err => this.setState({ error: err }));
  }

  getCardPayments(e) {
    e.preventDefault();
    this.setState({ error: undefined });
    this.state.paymentMethod = "/card-payment";
    this.createTable.call(this);
  }

  getReqPayments(e) {
    e.preventDefault();
    this.setState({ error: undefined });
    this.state.paymentMethod = "/require-payment";
    this.createTable.call(this);
  }

  render() {
    return (
      <div className="adm-panel">
        <h1>Панель администратора</h1>
        <iframe
          width="0"
          height="0"
          border="0"
          name="dummyframe"
          id="dummyframe"
          className="dummyframe"
        />
        <form className="adm-panel_filters" target="dummyframe">
          <h4>Фильтр:</h4>
          <label for="filter">Значение для поиска: </label>
          <input
            className="filter__text"
            type="text"
            name="filter"
            id="filter"
            onChange={this.handleInput}
          />
          <label for="field"> Поле для поиска: </label>
          <input
            className="filter__text"
            type="text"
            name="field"
            id="field"
            onChange={this.handleInput}
          />
          <h4>Сортировка:</h4>
          <label for="sort-field">Поле сортировки: </label>
          <input
            className="filter__text"
            type="text"
            name="sort_field"
            id="sort-field"
            onChange={this.handleInput}
          />
          <input type="checkbox" id="desc" onChange={this.handleCheck} />
          <label for="desc"> В порядке убывания</label>
          <br />
          <button className="filter__button" onClick={this.getCardPayments.bind(this)}>
            Получить платежи с карты
          </button>
          <button className="filter__button" onClick={this.getReqPayments.bind(this)}>
            Получить запрошенные платежи
          </button>
        </form>
        {this.renderTable()}
      </div>
    );
  }
}
