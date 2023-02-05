import { JourneyEntry } from "../types";
import Journey from "./Journey";

interface JourneyListProps {
  journeyList: Array<JourneyEntry>;
}

const JourneyList = ({ journeyList }: JourneyListProps) => {
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
          {journeyList.map((journey) => {
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
    </div>
  );
};

export default JourneyList;
