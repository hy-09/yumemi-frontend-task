import { useQuery } from "@tanstack/react-query";
import { populationCompositionKeys } from "../query-keys";
import { fetchPopulationComposition } from "../api";
import { FetchPopulationComposition } from "../types/population";

export default function usePopulationComposition(
  params: FetchPopulationComposition["Params"] | undefined
) {
  return useQuery({
    queryKey: params ? populationCompositionKeys.list(params) : [],
    queryFn: () =>
      params ? fetchPopulationComposition(params) : Promise.resolve(null),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: !!params,
  });
}
