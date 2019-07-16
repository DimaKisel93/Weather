import React from "react";

const Weather = props => ( 
    <div>
      
      {(Object.keys(props.data).length !== 0) &&
        <div className="infoWeath">
          <p>Местоположение:{props.data.name}</p> 
          <p>Температура:{props.data.main.temp}</p> 
          <p>Давление:{props.data.main.pressure}</p> 
          <p>Cкорость Ветра:{props.data.wind.speed}</p> 
          {/* <p>Давление:{props.data}</p>
          <p>Заход солнца:{props.data}</p>
          <p>Cкорость Ветра:{props.data}</p> */}
        </div>
      }
      <p className="error">{props.error}</p>
    </div>
);



export default Weather;