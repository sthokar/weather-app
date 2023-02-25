import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/Search';

function App() {
  const handleOnSearchChange = (searchData) =>{
    console.log("Hi")
  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/>
    </div>
  );
}

export default App;
