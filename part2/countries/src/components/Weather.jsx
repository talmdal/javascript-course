import axios from 'axios'
import { useState, useEffect } from "react"

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q='
const iconUrl = 'https://openweathermap.org/img/wn/'
const apiKey = import.meta.env.VITE_WEATHER_APPID
console.log('Api Key', apiKey)

export const Weather = (props) => {
    const { city } = props
    const [currrentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        const weatherUrl = `${apiUrl}${city}&APPID=${apiKey}`
        console.log('weather url:', weatherUrl)
        axios
          .get(weatherUrl)
          .then((response) => response.data)
          .then((data) => {
            console.log('Response from weather api', data)
            const { temp } = data.main
            const { speed } = data.wind
            const { icon } = data.weather[0]
            console.log('current weather', { temp, speed, icon })
            setCurrentWeather( { temp, speed, icon } )
          })
      }, [city]
    )

    const {temp, speed, icon} = currrentWeather
    return (
        <>
          <h2>Weather in {city}</h2>
          <p>Temperature:&nbsp; {temp} Celsius</p>
          {icon 
            && <img src={`${iconUrl}${icon}@2x.png`} 
                width="100"
                alt="Current weather" />
          }
          <br />
          <p>Wind:&nbsp;{speed} &nbsp; m/s</p>
        </>
    )
}