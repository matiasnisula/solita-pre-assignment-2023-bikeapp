import { useEffect, useState } from "react";
import axios from "axios";
import { StationEntry, PageInfo } from "../types";

const useStations = (url: string, page?: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stations, setStations] = useState<StationEntry[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [lastItemId, setLastItemId] = useState(0);

  type AxiosResponse = {
    stations: StationEntry[];
    pageInfo: PageInfo;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await axios.get<AxiosResponse>(url, {
        params: {
          page,
          lastItemId,
        },
      });
      setHasNext(result.data.pageInfo.hasNext);
      setHasPrev(result.data.pageInfo.hasPrev);
      setLastItemId(result.data.pageInfo.lastItemId);
      setStations(stations.concat(result.data.stations));
      console.log("result.data:", result.data);
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
