import axios from "axios";
import { StationEntry, PageInfo } from "../types";
import { BACKEND_BASE_URL } from "../config";

type AxiosResponse = {
  stations: StationEntry[];
  pageInfo: PageInfo;
};

export const getAll = async (params: { page: number; lastItemId: number }) => {
  const result = await axios.get<AxiosResponse>(
    `${BACKEND_BASE_URL}/api/stations`,
    {
      params: {
        ...params,
      },
    }
  );
  return result.data;
};
