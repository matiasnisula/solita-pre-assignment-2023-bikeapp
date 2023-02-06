import { useRef, useCallback, useState } from "react";
import useStations from "./hooks/useStations";
import JourneyList from "./components/JourneyList";
import StationList from "./components/StationList";

const App = () => {
  const stationUrl = "http://localhost:3001/api/stations";
  const [pageNumberStations, setPageNumberStations] = useState(0);

  const {
    stations,
    loading: loadingStations,
    hasNext: hasNextStations,
  } = useStations(stationUrl, pageNumberStations);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastStationRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (loadingStations) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextStations) {
          setPageNumberStations((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
      console.log("node:", node);
    },
    [loadingStations, hasNextStations]
  );

  return (
    <div>
      <JourneyList />
      <StationList stationList={stations} lastStationRef={lastStationRef} />
    </div>
  );
};

export default App;
