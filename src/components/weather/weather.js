import React, {Component} from 'react';
import './weather.css';
import axios from 'axios';
import Headers from './headers';
import Modal from './modal';

class Weather extends Component {
  constructor(){
    super();
    this.state = {
      temp: "",
      cityName: "",
      weather: "",
      high: "",
      low: "",
      icon: "",
      isRaining: "",
      showModal: true
    }
  }

  componentDidMount(){
    this.getCityWeather('Chattanooga');
    const elems = document.querySelectorAll('.modal');
 
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.weather !== prevState.weather){
      const isRaining = this.state.weather.includes("rain");
      if(isRaining){
        this.setState({
          isRaining: "It's Raining!!!"
        })
      }
    }
  }

  searchCity = (e)=>{
    e.preventDefault();
    const city = document.getElementById('city').value;
    this.getCityWeather(city);
  }

  getCityWeather = (city)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e312dbeb8840e51f92334498a261ca1d`
    axios.get(url).then((resp)=>{
      this.setState({
        temp: resp.data.main.temp,
        high: resp.data.main.temp_max,
        low: resp.data.main.temp_min,
        weather: resp.data.weather[0].description,
        icon: resp.data.weather[0].icon,
        cityName: resp.data.name
      })
    })    
  }

  removeModal = ()=>{
    this.setState({
      showModal: false
    })
  }

  render(){
    const iconUrl = `http://openweathermap.org/img/w/${this.state.icon}.png`

    return (
      <div className="App">
      <div className="row">
        <div className="col s6 offset-s3">
          <Headers temp={this.state.temp} isRaining={this.state.isRaining} />
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Chattanooga</a>
          </div>
        </div>  

        {this.state.showModal ? <Modal iconUrl={iconUrl} weather={this.state.weather} cityName={this.state.cityName} low={this.state.low} high={this.state.high} /> : ""}
      </div>
    );
  }
}

export default Weather;