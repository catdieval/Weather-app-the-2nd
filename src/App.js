import { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form.js";
import List from "./Components/List.js";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [isGoodWeather, setIsGoodWeather] = useState(null);
  const [emoji, setEmoji] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });

  const defaultActivities = [
    { name: "baking", isForGoodWeather: false, id: 1},
    { name: "cycling", isForGoodWeather: true, id: 2}
  ];

  const filteredDefaultActivities = filterActivities(defaultActivities);

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather"
      );

      const weather = await response.json();
      console.log(weather);

      setIsGoodWeather(weather.isGoodWeather);
      setEmoji(weather.condition);
      setTemperature(weather.temperature);
    }

    fetchWeather();

    const timerId = setInterval(fetchWeather, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  function handleAddActivity(newActivity) {
    const allActivities = [...activities];
    allActivities.push(newActivity);
    setActivities(allActivities);
  }

  function filterActivities(activities) {
    const copy = [...activities];
    const filteredActivities = copy.filter(
      (activity) => activity.isForGoodWeather === isGoodWeather
    );
    return filteredActivities;
  }

  function handleDeleteActivity(id) {
    let allActivities = [...activities];
    allActivities = allActivities.filter((activity) => activity.id !== id);

    setActivities(allActivities);
  }

  return (
    <>
      <h1 className="title">
        Weather-app <span>{emoji}</span> {temperature} °C
      </h1>
      <br/>
      <h2>
        {isGoodWeather
          ? "The weather is good! Go outside for these activities:"
          : "Bad weather outside! Stay indoors for these activities:"}
      </h2>
      <ul className="list-container">
        {filteredDefaultActivities.map((activity) => (
          <li key={activity.id} className="default-activity">
            {activity.name}
          </li>
        ))}
      </ul>
      <List
        activities={filterActivities(activities)}
        isGoodWeather={isGoodWeather}
        onDeleteActivity={handleDeleteActivity}
      />
      <br/>
      <Form onAddActivity={handleAddActivity} />
    </>
  );
}

export default App;
