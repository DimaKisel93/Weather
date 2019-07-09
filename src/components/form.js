import React from "react";

const Form = props => (
  <form onSubmit={props.weatherMethod}>
    <input type="text" name="city" placeholder="Город"/>
    <button>Получить погоду</button>
    <div className="source">
      <label className="source__choice">Выберите сервис</label>
      <div className="sourec__item">
        <input type="radio" id="contactChoice1" name="source" value="openmap" className="source__button" defaultChecked/>
        <label className="source__title" htmlFor="contactChoice1">https://openweathermap.org</label>
      </div>
      <div className="sourec__item">
        <input type="radio" id="contactChoice2" name="source" value="apixu" className="source__button"/>
        <label className="source__title" htmlFor="contactChoice2">https://www.apixu.com</label>
      </div>
    </div>
  </form>
)

export default Form;