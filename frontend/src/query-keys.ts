import { FetchPopulationComposition } from "./types/population";

export const prefectureKeys = {
  all: ["prefectures"] as const,
  lists: () => [...prefectureKeys.all, "list"] as const,
};
