import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);


  const handleSubmit = (e) => {
    setCities([...cities, city]);
    e.target.reset();
    e.preventDefault();
  }
  const removeCity = (cityName) => {
    const rest = cities.filter(city => city !== cityName);
    setCities(rest);
  }

  const updateCity = (cityName, newName) => {
    const index = cities.indexOf(cityName);
    const nowCities = [...cities];
    nowCities[index] = newName;
    setCities(nowCities);
  }



  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setCity(e.target.value)} type="text" />
          <input type="submit" />
        </form>
      </div>
      <div>
        {
          cities.map(city => <ShowWeather removeCity={removeCity} updateCity={updateCity} name={city} key={city} />)
        }
      </div>
    </div>
  );
}


const ShowWeather = ({ name, removeCity, updateCity }) => {
  const [update, setUpdate] = useState(false);
  const [weather, setWeather] = useState({});
  const [newCity, setNewCity] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c3bdefc76f6499029863ba4a34316e9c`;

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setWeather(data))
  }, [url])


  return (
    <div>
      <p>{name}</p>
      <small>{(weather?.main?.temp - 273.15).toFixed(2)} &deg; Celsius</small>
      <button onClick={() => removeCity(name)}>Remove</button>
      <button onClick={() => setUpdate(true)}>Update</button>

      {
        update && <div>
          <input required onChange={(e) => setNewCity(e.target.value)} type="text" />
          <button onClick={() => updateCity(name, newCity)}>Update</button>
        </div>
      }
      <br />
      <br />
    </div>
  )
}

export default App;
