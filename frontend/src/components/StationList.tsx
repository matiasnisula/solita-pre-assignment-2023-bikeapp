import { useRef, useCallback, useState } from "react";
import useStations from "../hooks/useStations";

const StationList = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { stations, loading, hasNext } = useStations(pageNumber);

  // infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStationRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
      console.log("node:", node);
    },
    [loading, hasNext]
  );

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
          {stations.map((station, i) => {
            if (stations.length === i + 1) {
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
