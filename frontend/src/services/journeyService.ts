import axios from "axios";
import { JourneyEntry, PageInfo } from "../types";

const url = "http://localhost:3001/api/journeys";

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
  const result = await axios.get<AxiosResponse>(url, {
    params: {
      ...params,
    },
  });
  return result.data;
};
