import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as stationService from "../services/stationService";
import { SingleStationViewEntry } from "../types";

const Station = () => {
  const [station, setStation] = useState<SingleStationViewEntry | null>(null);
  const id = useParams().id;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchStation = async () => {
      const result = await stationService.getById(Number(id));
      setStation(result);
    };
    fetchStation().catch((error) => {
      console.log(error);
    });
  }, []);
  if (!station) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>ID: {station?.id}</p>
      <p>NAME: {station?.name}</p>
      <p>ADDRESS: {station?.address}</p>
      <p>POSITION X: {station?.x}</p>
      <p>POSITION Y: {station?.y}</p>
      <p>TOTAL JOURNEYS STARTED: {station?.totalJourneysStarted}</p>
      <p>TOTAL JOURNEYS ENDED: {station?.totalJourneysEnded}</p>
    </div>
  );
};

export default Station;
