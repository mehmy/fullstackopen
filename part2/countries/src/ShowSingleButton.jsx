import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowSingleButton = ({ FilterCountries }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${FilterCountries.capitalInfo.latlng[0]}&lon=${FilterCountries.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        setWeatherInfo(res.data);
      });
  }, []);

  if (!weatherInfo) {
    return null;
  }

  const weatherIcon = `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;

  return (
    <>
      <div key={FilterCountries.name.common}>
        <h1>{FilterCountries.name.common}</h1>
        {console.log(weatherInfo)}
        <p className="paragraph">{FilterCountries.capital}</p>
        <p className="paragraph">area {FilterCountries.area}</p>
        <p>
          <strong>languages</strong>
        </p>
        <div>
          <ul>
            {Object.keys(FilterCountries.languages).map((lan) => (
              <li key={lan}>{FilterCountries.languages[lan]}</li>
            ))}
          </ul>
        </div>
        &nbsp;
        <div>
          <img src={FilterCountries.flags.png} />
        </div>
        <div>
          <h2>Weather in {FilterCountries.capital}</h2>
          <p>temperature {weatherInfo.main.temp} Celcius</p>
          <img src={weatherIcon} />
          <p>wind {weatherInfo.wind.speed} m/s</p>
        </div>
      </div>
    </>
  );
};

export default ShowSingleButton;
