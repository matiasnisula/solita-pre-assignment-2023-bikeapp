import { useRef, useCallback, useState } from "react";
import useJourneys from "./hooks/useJourneys";
import useStations from "./hooks/useStations";
import JourneyList from "./components/JourneyList";
import StationList from "./components/StationList";

const App = () => {
  const journeyUrl = "http://localhost:3001/api/journeys";
  const stationUrl = "http://localhost:3001/api/stations";
  const [pageNumberStations, setPageNumberStations] = useState(0);
  const [pageNumberJourneys, setPageNumberJourneys] = useState(0);

  const {
    journeys,
    loading: loadingJourneys,
    hasNext: hasNextJourneys,
    hasPrev: hasPrevJourneys,
  } = useJourneys(journeyUrl, pageNumberJourneys);

  const {
    stations,
    loading: loadingStations,
    hasNext: hasNextStations,
  } = useStations(stationUrl, pageNumberStations);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastStationRef = useCallback(
    (node: HTMLElement) => {
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

  console.log("data:", stations);
  console.log("pageNumber:", pageNumberStations);

  return (
    <div>
      <JourneyList journeyList={journeys} />
      <StationList stationList={stations} lastStationRef={lastStationRef} />
    </div>
  );
};

export default App;
