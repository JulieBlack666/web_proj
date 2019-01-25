import React, { Component } from "react";
import Galery from "./Galery.js";
import "../../styles/company.css";

export default class AboutCompany extends Component {
  state = {
    company: "",
    description: `Ко́шка, или дома́шняя ко́шка (лат. Félis silvéstris cátus), — домашнее животное, одно из наиболее популярных (наряду с собакой) «животных-компаньонов».
    С точки зрения научной систематики, домашняя кошка — млекопитающее семейства кошачьих отряда хищных. Ранее домашнюю кошку нередко рассматривали как отдельный биологический вид. С точки зрения современной биологической систематики домашняя кошка (Felis silvestris catus) является подвидом лесной кошки (Felis silvestris).
    Являясь одиночным охотником на грызунов и других мелких животных, кошка — социальное животное, использующее для общения широкий диапазон звуковых сигналов, а также феромоны и движения тела.
    В настоящее время, в мире насчитывается около 600 млн домашних кошек, выведено около 200 пород, от длинношёрстных (персидская кошка) до лишённых шерсти (сфинксы), признанных и зарегистрированных различными фелинологическими организациями. 
    На протяжении 10 000 лет кошки ценятся человеком, в том числе за способность охотиться на грызунов и других домашних вредителей.`
  };

  componentDidMount() {
    fetch("/api/user_info")
      .then(res => res.json())
      .then(res => this.setState({ company: res.name }))
      .catch(console.error());
  }

  render() {
    return (
      <section className="about-company">
        <input type="radio" class="about-company__check-desc" name="show-hide" id="hide" checked />
        <input type="radio" class="about-company__check-desc" name="show-hide" id="show" />
        <h2 className="about-company__name">
          O компании Индивидуальный предприниматель {this.state.company}
        </h2>
        <Galery />
        <div className="about-company__short-desc">{this.state.description.substr(0, 160)}... </div>
        <div className="about-company__full-desc">{this.state.description}</div>
        <label for="hide" className="about-company__desc-label">
          Скрыть
        </label>
        <label for="show" className="about-company__desc-label">
          Показать ещё
        </label>
      </section>
    );
  }
}
