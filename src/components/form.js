import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serviceName: "openmap" };
  }  
  
  setServiceName(serviceName){
    this.setState({
      serviceName
    })
  }

  render(){
    return(
      
      <form onSubmit={(e)=>this.props.weatherMethod(e, this.state.serviceName)}>
        <input type="text" name="city" placeholder="Город" onChange = {(event)=>this.props.gettingCity(event)}/>
        <button>Получить погоду</button>
        <div className="source">
          <label className="source__choice">Выберите сервис</label>
          <div className="sourec__item" onClick={()=>this.setServiceName("openmap")}>
            <input type="radio"  id="contactChoice1" name="source" value="openmap" className="source__button" defaultChecked/>
            <label className="source__title" htmlFor="contactChoice1">https://openweathermap.org</label>
          </div>
          <div className="sourec__item" onClick={()=>this.setServiceName("apixu")}>
            <input type="radio"  id="contactChoice2" name="source" value="apixu" className="source__button"/>
            <label className="source__title" htmlFor="contactChoice2">https://www.apixu.com</label>
          </div>
        </div>
      </form>
      
    )
  }
}

 

export default Form;