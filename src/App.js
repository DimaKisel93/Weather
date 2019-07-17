import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "125068128513a6c2a72f650bc8020952";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      temp: undefined,
      country: undefined,
      pressure: undefined,
      wind: undefined,
      error: undefined,
      ourCity:'',
      city:'',
    }
  }
  async componentDidMount () {
    const ip_url = await fetch('https://ip-location.icu/api/v1/user-info/?format=json&apiKey=1kCB9PKk5aYnCvJevQvHWqIxmt5t7xnSYAIQpddZ')
    const ipData = await ip_url.json()
    const ip = await ipData.ip;

    const city_url = await fetch(`https://ip-location.icu/api/v1/city/?format=json&apiKey=1kCB9PKk5aYnCvJevQvHWqIxmt5t7xnSYAIQpddZ&ip=${ip}`);
    const cityData = await city_url.json();
    const city = await cityData.city_name;
    localStorage.setItem("ourCity", city)
    const ourCity = localStorage.getItem("ourCity")
    this.setState({ourCity: ourCity})
  } 
  
  onChange = event =>{
    this.setState({city:event.target.value})
  }

  
  
  gettingWeather = (e, serviceName) =>{
    
    e.preventDefault();
    const { city } = this.state;

    if (city === '') {
      this.setState({
        error: "Введите название города"
      })  
      return;
    }
    debugger;
    let cachedData = localStorage.getItem(serviceName+city);
    cachedData = JSON.parse(cachedData);
    
    
    const nowTime = +new Date();
    if (cachedData){
      var currentTime = (nowTime-cachedData.lastRunAT)/3600000;  
    }
    
      switch(serviceName){
        case "openmap": 
         
        if (cachedData && currentTime < 2) {
          this.setState({ 
            temp: cachedData.main.temp,
            city: cachedData.name,
            country: cachedData.sys.country,
            pressure: cachedData.main.pressure,
            wind: cachedData.wind.speed,
            error: undefined
          });
         
        } else {
           
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(result => this.onSetResult(result, city,serviceName));
              
        }
        break;
       
        case "apixu": 
        if (cachedData && currentTime <2) {
          this.setState({
            temp: cachedData.current.temp_c,
            city: cachedData.location.name,
            contry: cachedData.location.country,
            pressure: cachedData.current.pressure_mb,
            wind: cachedData.current.wind_kph,
            error: undefined 
          })
        }else{
          fetch(` http://api.apixu.com/v1/current.json?key=9a6bb15c57ca4a3ba3b122603190907&q=${city}`)
              .then(response => response.json())
              .then(result => this.onSetResult(result, city,serviceName))
        }
        break;  
      }
  }
  
  onSetResult = (result, city, serviceName) => {
    result.lastRunAT = +new Date();
    localStorage.setItem(serviceName+city, JSON.stringify(result));
   
    
    switch (serviceName){
      case "openmap":
        this.setState({ 
          temp: result.main.temp,
          city: result.name,
          country: result.sys.country,
          pressure: result.main.pressure,
          wind: result.wind.speed,
          error: undefined
        });
        break;
      case "apixu":
        this.setState({
            temp: result.current.temp_c,
            city: result.location.name,
            country: result.location.country,
            pressure: result.current.pressure_mb,
            wind: result.current.wind_kph,
            error: undefined 
        });
        break;    
    }
    
  }
    render(){
    
    return(
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info cityMethod={this.getCity}
                      town = {this.state.ourCity}/>
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} gettingCity={this.onChange}/>  
                <Weather
                  temp = {this.state.temp}  
                  city = {this.state.city}  
                  country = {this.state.country}  
                  pressure = {this.state.pressure}   
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