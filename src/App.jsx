import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  function getWeather(event) {
    event.preventDefault();
    const location = event.target.elements.location.value;
    setLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${
      import.meta.env.VITE_API_KEY
    }&q=${location}&aqi=no
    `)
      .then((response) => {
        response.json().then((result) => {
          const show = (
            <div className="card">
              <p>{result.location.name}</p>
              <p>{result.location.region}</p>
              <p>{result.location.country}</p>
              <div className="card">
                <p>{result.current.condition.text}</p>
                <img src={result.current.condition.icon} />
                <p>Current temperature:</p>
                <p>
                  {result.current.temp_c}°C / {result.current.temp_f}°F
                </p>
              </div>
            </div>
          );
          setData(show);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
        const show = (
          <div>
            <p>Sorry, there was an error</p>
            <p>{JSON.stringify(error)}</p>
          </div>
        );
        setData(show);
        setLoading(false);
      });
  }

  return (
    <>
      <h1>Weather app</h1>
      {loading ? (
        <div className="card">Loading...</div>
      ) : (
        <div className="card">
          <p>Enter location for which you would like weather info:</p>
          <form onSubmit={getWeather}>
            <input name="location" />
            <button type="submit">Get weather</button>
          </form>
        </div>
      )}

      <div className="card">{data}</div>
    </>
  );
}

export default App;
