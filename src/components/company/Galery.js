import React, { Component } from "react";
import tardis from "../../images/TARDIS.jpg";
import screwdriver from "../../images/1.jpg";
import uni from "../../images/universe.jpg";

export default class Galery extends Component {
  addList = [
    { photo: tardis, desc: "Такси дёшево!", price: "от 50 руб." },
    { photo: screwdriver, desc: "Ремонт мебели", price: "1000 руб." },
    { photo: uni, desc: "Экскурсии", price: "Бесплатно" }
  ];

  render() {
    const addsToRender = this.addList.map(e => (
      <article className="add">
        <div className="add__imgholder">
          <img className="add__img" src={e.photo} alt="add image" />
        </div>
        <h6 className="add__desc">{e.desc}</h6>
        <span className="add__price">{e.price}</span>
      </article>
    ));
    return <section className="galery">{addsToRender}</section>;
  }
}
