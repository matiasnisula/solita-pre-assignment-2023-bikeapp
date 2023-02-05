import { StationEntry } from "../types";

interface StationListProps {
  stationList: Array<StationEntry>;
  lastStationRef?: (node: HTMLTableRowElement) => void;
}

const StationList = ({ stationList, lastStationRef }: StationListProps) => {
  return (
    <div>
      <h1>Stations</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {stationList.map((station, i) => {
            if (stationList.length === i + 1) {
              return (
                <tr key={station.id} ref={lastStationRef}>
                  <td>{station.id}</td>
                  <td>{station.name}</td>
                  <td>{station.address}</td>
                  <td>{station.city}</td>
                  <td>{station.capacity}</td>
                </tr>
              );
            }
            return (
              <tr key={station.id}>
                <td>{station.id}</td>
                <td>{station.name}</td>
                <td>{station.address}</td>
                <td>{station.city}</td>
                <td>{station.capacity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StationList;
