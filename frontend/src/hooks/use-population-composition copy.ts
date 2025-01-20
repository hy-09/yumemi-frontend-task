import { fetchPopulationComposition } from "@/api";
import { populationCompositionKeys } from "@/query-keys";
import { FetchPopulationComposition } from "@/types/population";
import { useQuery } from "@tanstack/react-query";

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
