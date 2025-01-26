import { Response } from "@/types/general";
import { PrefCode } from "@/types/prefecture";
import { POPULATION_COMPOSITION__AGE_LABELS } from "@/consts/population-composition";

export type PopulationCompositionLabel =
  (typeof POPULATION_COMPOSITION__AGE_LABELS)[number];

export type PopulationComposition = {
  boundaryYear: number;
  data: {
    label: PopulationCompositionLabel;
    data: {
      year: number;
      value: number;
      rate: number;
    }[];
  }[];
};

export type FetchPopulationComposition = {
  Params: {
    prefCode: PrefCode;
  };
  Response: Response<PopulationComposition>;
};
