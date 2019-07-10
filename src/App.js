import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "125068128513a6c2a72f650bc8020952";

class App extends React.Component{

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    wind: undefined,
    error: undefined
  }

  gettingWeather = async (e, serviceName) =>{
    
    e.preventDefault();
    const city = e.target.elements.city.value;
    
    
    if(city){
      switch(serviceName){
        case "openmap": 
        const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        let sunset = data.sys.sunset;
        let date = new Date();
        date.setTime(sunset);
        let sunset_date = date.getHours() + ":" +date.getMinutes() + ":" + date.getSeconds();
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          sunset: sunset_date,
          wind: data.wind.speed,
          error: undefined
          
        })
        break;
        case "apixu":
  
        const api_url1 = await
        fetch(` http://api.apixu.com/v1/current.json?key=9a6bb15c57ca4a3ba3b122603190907&q=Paris`);
        const data1 = await api_url1.json();       
      }
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        wind: undefined,
        error: "Введите название города"
      })  
    } 
  }

  render(){
    
    return(
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather}/>  
                <Weather
                  temp = {this.state.temp}  
                  city = {this.state.city}  
                  country = {this.state.country}  
                  pressure = {this.state.pressure}  
                  sunset = {this.state.sunset} 
                  wind = {this.state.wind} 
                  error = {this.state.error}  
                />  
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default App; 