import { useState, useEffect } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/Current-weather";
import Forecast from "./components/forecast/Forecast";
import { WEATHER_API_URL } from "./Api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    if (!searchData) return;
    const [lat, lon] = searchData.value.split(" ");
    const fetchWeatherData = async () => {
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`).then((response) => response.json()),
        fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`).then((response) => response.json()),
      ]);
      setCurrentWeather({ city: searchData.label, ...currentWeatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    };
    fetchWeatherData();
  }, [searchData]);

  const handleOnSearchChange = (searchData) => {
    setSearchData(searchData);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
