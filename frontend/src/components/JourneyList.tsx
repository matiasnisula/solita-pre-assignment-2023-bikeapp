import { useState } from "react";
import useJourneys from "../hooks/useJourneys";
import Journey from "./Journey";

const JourneyList = () => {
  const journeyUrl = "http://localhost:3001/api/journeys";
  const [pageNumber, setPageNumber] = useState(0);

  const { journeys, loading, hasNext, hasPrev, setGetPrevPage } = useJourneys(
    journeyUrl,
    pageNumber
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Journeys</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Departure station</th>
            <th>Return station</th>
            <th>Covered distance</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((journey) => {
            return (
              <Journey
                key={journey.id}
                id={journey.id}
                departureDate={journey.departureDate}
                returnDate={journey.returnDate}
                departureStation={journey.departureStation}
                returnStation={journey.returnStation}
                coveredDistance={journey.coveredDistance}
                duration={journey.duration}
              />
            );
          })}
        </tbody>
      </table>
      <div>
        {hasPrev && (
          <button
            onClick={() => {
              setPageNumber((prev) => prev - 1);
              setGetPrevPage(true);
            }}
          >
            Prev
          </button>
        )}
        {hasNext && (
          <button
            onClick={() => {
              setPageNumber((prev) => prev + 1);
              setGetPrevPage(false);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default JourneyList;
