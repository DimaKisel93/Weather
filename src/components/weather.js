import React from "react";

const Weather = props => ( 
    <div>
    {props.temp &&
      <div>
        <p>Местоположение: {props.city}, {props.country}</p>
        <p>Температура:{props.temp}</p>
        <p>Давление:{props.pressure}</p>
        <p>Заход солнца:{props.sunset}</p>
        <p>Cкорость Ветра:{props.wind}</p>
      </div>
    }
    <p>{props.error}</p>
    </div>
);



export default Weather;