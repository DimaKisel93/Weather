import React from "react";
import {nameOpenmapServer, nameApixuServer} from "../const/data"


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serviceName: nameOpenmapServer };
  }  
  
  setServiceName(serviceName){
    this.setState({serviceName})
  }
  
  render(){
    const { weatherMethod, setInputCity} = this.props;
    const { serviceName } = this.state;

    return(
      
      <form onSubmit={(e)=>weatherMethod(e, serviceName)}>
        <input type="text" name="city" placeholder="Город" onChange = {(event)=>setInputCity(event)}/>
        <button>Получить погоду</button>
        <div className="source">
          <label className="source__choice">Выберите сервис</label>
          <div className="source__item" onClick={()=>this.setServiceName(nameOpenmapServer)}>
            <input type="radio" name="service" className="source__button" defaultChecked/>
            <label className="source__title" htmlFor="serviceName1">https://openweathermap.org</label>
          </div>
          <div className="source__item" onClick={()=>this.setServiceName(nameApixuServer)}>
            <input type="radio" name="service" className="source__button"/>
            <label className="source__title" htmlFor="serviceName2">https://www.apixu.com</label>
          </div>
        </div>
      </form>
      
    )
  }
}

 

export default Form;