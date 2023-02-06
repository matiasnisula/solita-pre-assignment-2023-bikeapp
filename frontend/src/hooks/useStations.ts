import { useEffect, useState } from "react";
import * as stationService from "../services/stationService";
import { StationEntry } from "../types";

const useStations = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stations, setStations] = useState<StationEntry[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [lastItemId, setLastItemId] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await stationService.getAll({ page, lastItemId });
      setHasNext(data.pageInfo.hasNext);
      setHasPrev(data.pageInfo.hasPrev);
      setLastItemId(data.pageInfo.lastItemId);
      setStations(stations.concat(data.stations));
      console.log("data:", data);
      setLoading(false);
    } catch (error: unknown) {
      console.log("ERROR:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return { stations, error, loading, hasNext, hasPrev };
};

export default useStations;
