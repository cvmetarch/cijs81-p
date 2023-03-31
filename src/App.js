import React, { useState } from 'react'
import axios from 'axios'
import { WEATHER_API_KEY, WEATHER_API_URL, list_icon } from './api';

let lico = {};
for (let obj in list_icon) {  
  lico[list_icon[obj]['type']] = list_icon[obj]['img'];
};

const dateTimecur = new Date();
console.log(dateTimecur.getDate(),'/',dateTimecur.getMonth()+1,'/',dateTimecur.getFullYear());

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `${WEATHER_API_URL}&q=${location}&units=metric&appid=${WEATHER_API_KEY}`

  const searchLocation = (event) => {

    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {       
        document.getElementById("ale").style.visibility = "hidden";
        setData(response.data)
        console.log(response.data)
      }
      )
      .catch((error) => {
        document.getElementById("ale").style.visibility = 'visible';
      });
      setLocation('')
      setData({})
      
    } 
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='ENTER YOUR LOCATION'
          type="text" />
      </div>

      {data.main ?      
        <div className="container">  
          <div className="d2">
            <h1> 
              {dateTimecur.getDate()}/{dateTimecur.getMonth() + 1}/{dateTimecur.getFullYear()}
            </h1>
            <div className="d1">
              <h2>{data.name}</h2>
              <h2>{data.sys.country}</h2>
            </div>
            <h1>{data.main.temp.toFixed()}°C</h1>
          </div>         
          
          <div className="d2">                    
            <img alt="" className="ico" src={lico[data.weather[0].main]} />
            <h2>
              {data.weather[0].main}        
            </h2>           
          </div>         

          <div className="d3">          
            <p className='bold'>
              Feels Like
            </p>
            <p> 
              {data.main.feels_like.toFixed()}°C
            </p>           
          </div>

        </div>   
        :null}
      <div id="ale" className='d4'>NOT FOUND!</div>
    </div>

  );
}

export default App;