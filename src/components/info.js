import React from "react";
const Info = props => (
  <div>
    <h2>Погодное приложение</h2>
    <p>Узнайте погоду в любом городе</p>
    <p>Ваше местоположение</p>
    <p>{props.town}</p>
  </div>
)

export default Info;