import { FetchPopulationComposition } from "./types/population";

export const prefectureKeys = {
  all: ["prefectures"] as const,
  lists: () => [...prefectureKeys.all, "list"] as const,
};

export const populationCompositionKeys = {
  all: ["populationCompositions"] as const,
  lists: () => [...populationCompositionKeys.all, "list"] as const,
  list: (params: FetchPopulationComposition["Params"]) =>
    [...populationCompositionKeys.lists(), params] as const,
};
