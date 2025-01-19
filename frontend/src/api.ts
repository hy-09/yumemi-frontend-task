import { axiosClient } from "./lib/network/axios";
import { Response } from "./types/general";
import { FetchPopulationComposition } from "./types/population";
import { Prefecture } from "./types/prefecture";

export async function fetchPrefectures() {
  const res = await axiosClient.get<Response<Prefecture[]>>(
    "/api/v1/prefectures"
  );
  return res.data.result;
}
