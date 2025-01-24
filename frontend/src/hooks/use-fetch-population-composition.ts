import { fetchPopulationComposition } from "@/backend/api";
import { useMutation } from "@tanstack/react-query";

export default function useFetchPopulationComposition() {
  return useMutation({
    mutationFn: fetchPopulationComposition,
  });
}
