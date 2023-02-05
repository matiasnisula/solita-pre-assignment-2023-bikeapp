import { useEffect, useState } from "react";
import axios from "axios";
import { JourneyEntry, PageInfo } from "../types";

const useJourneys = (url: string, page?: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [journeys, setJourneys] = useState<JourneyEntry[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [lastItemId, setLastItemId] = useState(0);

  type AxiosResponse = {
    journeys: JourneyEntry[];
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
      setJourneys(journeys.concat(result.data.journeys));
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

  return { journeys, error, loading, hasNext, hasPrev };
};

export default useJourneys;
