import axios from "axios";
import { JourneyEntry, PageInfo } from "../types";
import { BACKEND_BASE_URL } from "../config";

type AxiosResponse = {
  journeys: JourneyEntry[];
  pageInfo: PageInfo;
};

export const getAll = async (params: {
  page: number;
  lastItemId: number;
  firstItemId: number;
  previousPage: boolean;
}) => {
  const result = await axios.get<AxiosResponse>(
    `${BACKEND_BASE_URL}/api/journeys`,
    {
      params: {
        ...params,
      },
    }
  );
  return result.data;
};
