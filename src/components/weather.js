import React from "react";

const Weather = props => ( 
    <div>
      {props.temp &&
        <div className="info__Weather">
          <p>Местоположение: {props.city} , {props.country}</p> 
          <p>Температура: {props.temp}&deg;</p> 
          <p>Влажность: {props.humidity}%</p> 
        </div>
      }
      <p className="error"> {props.error}</p>
    </div>
);



export default Weather;