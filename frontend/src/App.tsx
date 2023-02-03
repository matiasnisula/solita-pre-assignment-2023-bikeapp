import axios from "axios";
import { useEffect, useState } from "react";
import { JourneyEntry } from "./types";
import JourneyList from "./components/JourneyList";

const App = () => {
  const [journeys, setJourneys] = useState([]);
  useEffect(() => {
    const fetchJourneys = async () => {
      const result = await axios.get("http://localhost:3001/api/journeys", {
        params: {
          limit: 10,
          after: 10,
        },
      });
      console.log("result:", result.data);
      setJourneys(result.data);
    };
    fetchJourneys().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <div>
      <h1>Journeys</h1>
      <JourneyList journeyList={journeys} />
    </div>
  );
};

export default App;
