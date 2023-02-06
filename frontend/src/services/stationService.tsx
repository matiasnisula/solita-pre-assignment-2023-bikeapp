import axios from "axios";
import { StationEntry, PageInfo } from "../types";

const url = "http://localhost:3001/api/stations";

type AxiosResponse = {
  stations: StationEntry[];
  pageInfo: PageInfo;
};

export const getAll = async (params: { page: number; lastItemId: number }) => {
  const result = await axios.get<AxiosResponse>(url, {
    params: {
      ...params,
    },
  });
  return result.data;
};
