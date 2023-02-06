import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JourneyList from "./components/JourneyList";
import StationList from "./components/StationList";

const App = () => {
  const padding = {
    padding: 5,
  };
  return (
    <BrowserRouter>
      <div>
        <Link style={padding} to="/journeys">
          journeys
        </Link>
        <Link style={padding} to="/stations">
          stations
        </Link>
      </div>
      <Routes>
        <Route path="/journeys" element={<JourneyList />} />
        <Route path="/stations" element={<StationList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
