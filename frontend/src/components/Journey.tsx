import { JourneyEntry } from "../types";

const Journey = ({
  id,
  departureStation,
  returnStation,
  coveredDistance,
  duration,
}: JourneyEntry) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{departureStation.name}</td>
      <td>{returnStation.name}</td>
      <td>{coveredDistance}</td>
      <td>{duration}</td>
    </tr>
  );
};

export default Journey;
