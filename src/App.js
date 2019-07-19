import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import {API_KEY_OPENMAP, API_KEY_APIXU, API_KEY_GEOLOCATION, limitTimeRequest, translateMStoHours, nameOpenmapServer, nameApixuServer} from "./const/data"; 

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      temp: undefined,
      country: undefined,
      humidity: undefined,
      error: undefined,
      ourCity:'',
      inputCity:''
    }
  }

  componentDidMount () {
    this.getCurrentCity()
  };

  async getCurrentCity(){
    const ip_url = await fetch(`https://ip-location.icu/api/v1/user-info/?format=json&apiKey=${API_KEY_GEOLOCATION}`);
    const ipData = await ip_url.json();
    const ip = await ipData.ip;
    
    const city_url = await fetch(`https://ip-location.icu/api/v1/city/?format=json&apiKey=${API_KEY_GEOLOCATION}&ip=${ip}`);
    const cityData = await city_url.json();
    const city = await cityData.city_name;
    localStorage.setItem("ourCity", city);
    const ourCity = localStorage.getItem("ourCity");
    this.setState({ourCity: ourCity})
  }
 
  gettingWeather = (e, serviceName) =>{
    e.preventDefault();
    const { inputCity } = this.state;

    if (inputCity === '') {
      this.setState({error: "Введите название города"})  
      return;
    }
      switch(serviceName){
        case nameOpenmapServer: 
          this.getWeatherFromOpenMap(serviceName, inputCity)
        break;
       
        case nameApixuServer: 
          this.getWeatherFromApixu(serviceName, inputCity)
        break;  
      }
  }

  getWeatherFromOpenMap(serviceName, inputCity) {
    let cachedData = localStorage.getItem(this.localStorageKey(serviceName, inputCity));
    cachedData = JSON.parse(cachedData);
    const nowTime = +new Date();
    if (cachedData) {
      var currentTime = (nowTime-cachedData.lastRunAT) / translateMStoHours;
    }
    if (cachedData && currentTime < limitTimeRequest) {
      this.setState({
        temp: cachedData.main.temp,
        inputCity: cachedData.name,
        country: cachedData.sys.country,
        humidity: cachedData.main.humidity,
        error: undefined
      });
    } else {
      this.getRequestToService(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY_OPENMAP}&units=metric`, inputCity, serviceName)
    }
  }

  getWeatherFromApixu(serviceName, inputCity) {
    let cachedData = localStorage.getItem(this.localStorageKey(serviceName, inputCity));
    cachedData = JSON.parse(cachedData);
    const nowTime = +new Date();
    if (cachedData) {
      var currentTime = (nowTime-cachedData.lastRunAT) / translateMStoHours;
    }
    if (cachedData && currentTime < limitTimeRequest) {
      this.setState({
        temp: cachedData.current.temp_c,
        inputCity: cachedData.location.name,
        country: cachedData.location.country,
        humidity: cachedData.current.humidity,
        error: undefined 
      })
    } else {
      this.getRequestToService(`http://api.apixu.com/v1/current.json?key=${API_KEY_APIXU}&q=${inputCity}`, inputCity ,serviceName)
    }
  }

  getRequestToService(url, serviceName, inputCity) {
    fetch(url)
            .then(response => {
              if (response.ok){
                return response.json()
              } else {
                throw new Error('Просим прощения, нет ответа сервера')
              }
            })
            .then(result => this.SetResult(result, serviceName, inputCity))
            .catch((error) => {
              alert('Просим прощения, возникли проблемы с запросом к данному сервису', error)
            });
  }

  setCity = event =>{
    this.setState({
      inputCity:event.target.value,
      temp: undefined,
      country: undefined,
      humidity: undefined,
      error: undefined,
    })
  };

  localStorageKey(serviceName, inputCity)  {
    return (serviceName+inputCity);
  };
    
  SetResult = (result, inputCity, serviceName) => {
    result.lastRunAT = +new Date();
    localStorage.setItem(this.localStorageKey(serviceName, inputCity), JSON.stringify(result));
    switch (serviceName){
      case nameOpenmapServer:
        this.setState({ 
          temp: result.main.temp,
          inputCity: result.name,
          country: result.sys.country,
          humidity: result.main.humidity,
          error: undefined
        });
        break;
      case nameApixuServer:
        this.setState({
            temp: result.current.temp_c,
            inputCity: result.location.name,
            country: result.location.country,
            humidity: result.current.humidity,
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
              <div className="col-xs-12 col-sm-5 col-md-4 info">
                <Info town = {this.state.ourCity}/>
              </div>
              <div className="col-xs-12 col-sm-7 col-md-8 form">
                <Form weatherMethod={this.gettingWeather} setInputCity={this.setCity}/>  
                <Weather
                  temp = {this.state.temp}  
                  city = {this.state.inputCity}  
                  country = {this.state.country}  
                  humidity = {this.state.humidity}   
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