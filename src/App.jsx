import Temperature from './components/temperature';
import Highlights from './components/Highlights';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [city, setCity] = useState("Okara");
  const [weatherData, setWeatherData] = useState(null);
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=67ae91f757664766b5f74811260902&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
    .then((response) => {
      if(!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setWeatherData(data);
    })
    .catch((e) => {
      console.log(e);
    })
  }, [city])

  return (
    <>
      <div className="bg-[#1F213A] h-screen flex justify-center align-top">

        <div className='mt-40 w-1/5 h-1/3'>
          {weatherData && <Temperature 
            setCity={setCity}
            stats={{
              temp: weatherData?.current?.temp_c,
              condition: weatherData?.current?.condition?.text,
              isDay: weatherData?.current?.is_day,
              location: weatherData?.location?.name,
              time: weatherData?.location?.localtime
            }}
          />}
        </div>

        <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-6'>
          <h2 className='text-slate-200 text-2xl col-span-2'>Today's Highlights</h2>
          {
            weatherData && (
              <>
                <Highlights
                  stats = {{
                    title: "Wind Status",
                    value: weatherData?.current?.wind_mph,
                    unit: "mph",
                    direction: weatherData?.current?.wind_dir
                  }}
                />
                <Highlights 
                  stats = {{
                    title: "Humidity",
                    value: weatherData?.current?.humidity,
                    unit: "%"
                  }}
                />
                <Highlights 
                  stats = {{
                    title: "Visibility",
                    value: weatherData?.current?.vis_miles,
                    unit: "miles"
                  }}
                />
                <Highlights 
                  stats = {{
                    title: "Air Pressure",
                    value: weatherData?.current?.pressure_mb,
                    unit: "mb",
                  }}
                />
              </>
            )
          }
        </div>

      </div>
    </>
  );
}

export default App;