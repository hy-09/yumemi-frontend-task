import { useSuspenseQuery } from "@tanstack/react-query";
import { prefectureKeys } from "../query-keys";
import { fetchPrefectures } from "../api";

export default function usePrefectures() {
  return useSuspenseQuery({
    queryKey: prefectureKeys.all,
    queryFn: () => fetchPrefectures(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
