import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "125068128513a6c2a72f650bc8020952";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // temp: undefined,
      // city: undefined,
      // country: undefined,
      // pressure: undefined,
      // sunset: undefined,
      // wind: undefined,
      ipData: [],
      error: undefined,
      town:'',
      city:'',
      data:{}
    }
  }
  async componentDidMount () {
    const ip_url = await fetch('https://ip-location.icu/api/v1/user-info/?format=json&apiKey=1kCB9PKk5aYnCvJevQvHWqIxmt5t7xnSYAIQpddZ')
    const ipData = await ip_url.json()
    const ip = await ipData.ip;

    const city_url = await fetch(`https://ip-location.icu/api/v1/city/?format=json&apiKey=1kCB9PKk5aYnCvJevQvHWqIxmt5t7xnSYAIQpddZ&ip=${ip}`);
    const cityData = await city_url.json();
    const city = await cityData.city_name;
    this.setState({town: city})
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

    const cachedData = localStorage.getItem(serviceName+city);
    
    // const city = e.target.elements.city.value;
 
    
      
      switch(serviceName){
        case "openmap": 
        // const api_url = await
        if (cachedData) {
          this.setState({ data: JSON.parse(cachedData) });
        } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
              .then(response => response.json())
              .then(result => this.onSetResult(result, city,serviceName))
        }
        break;
        
        
        // const data = await api_url.json()
        // const last_run_at = new Date();
        // const results = [
        //   serviceName, 
        //   last_run_at,{ 
        //   temp: data.main.temp,
        //   city: data.name,
        //   country: data.sys.country,
        //   pressure: data.main.pressure,
        //   wind: data.wind.speed,
        //   error: undefined,
        //   }  
        //   ];
        // const result = await JSON.stringify(results);
      
        // if (returnResult.last_run_at) < 2.hours{

        // }
        
         
        // if (result.last_run_at <2.hours)
        // this.setState({
        //   // temp: result.main.temp,
        //   // city: result.name,
        //   // country: result.sys.country,
        //   // pressure: result.main.pressure,
        //   // wind: result.wind.speed,
        //   // error: undefined,
        //   data:[result]
        // })
        // localStorage.setItem("key",resulst);
       
        // case "apixu": 
        // // const api_url1 = await
        // fetch(` http://api.apixu.com/v1/current.json?key=9a6bb15c57ca4a3ba3b122603190907&q=${city}`);
        // const data1 = await api_url1.json();
        // this.setState({
        //   temp: data1.current.temp_c,
        //   city: data1.location.name,
        //   country: data1.location.country,
        //   pressure: data1.current.pressure_mb,
        //   wind: data1.current.wind_kph,
        //   error: undefined
        // })       
      }
    
    
  }
  
  onSetResult = (result, city, serviceName) => {
    result.lastRunAT = new Date();
    localStorage.setItem(serviceName+city, JSON.stringify(result));
    this.setState({ data: result});
  }

  render(){
    
    return(
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info cityMethod={this.getCity}
                      towns = {this.state.town}/>
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} gettingCity={this.onChange}/>  
                <Weather
                  // temp = {this.state.temp}  
                  // city = {this.state.city}  
                  // country = {this.state.country}  
                  // pressure = {this.state.pressure}  
                  // sunset = {this.state.sunset} 
                  // wind = {this.state.wind} 
                  error = {this.state.error}
                  
                  data = {this.state.data}  
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