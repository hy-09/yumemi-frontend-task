import { fetchPrefectures } from "@/api";
import { prefectureKeys } from "@/query-keys";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function usePrefectures() {
  return useSuspenseQuery({
    queryKey: prefectureKeys.lists(),
    queryFn: () => fetchPrefectures(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
