import { useEffect, useState } from "react";
import * as journeyService from "../services/journeyService";
import { JourneyEntry } from "../types";

const useJourneys = (page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [journeys, setJourneys] = useState<JourneyEntry[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [lastItemId, setLastItemId] = useState(0);
  const [firstItemId, setFirstItemId] = useState(0);
  const [getPrevPage, setGetPrevPage] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await journeyService.getAll({
        page,
        lastItemId,
        firstItemId,
        previousPage: getPrevPage,
      });
      setHasNext(data.pageInfo.hasNext);
      setHasPrev(data.pageInfo.hasPrev);
      setLastItemId(data.pageInfo.lastItemId);
      setFirstItemId(data.pageInfo.firstItemId);
      setJourneys(data.journeys);
      console.log("result.data:", data);
      setLoading(false);
    } catch (error: unknown) {
      console.log("ERROR:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return { journeys, error, loading, hasNext, hasPrev, setGetPrevPage };
};

export default useJourneys;
