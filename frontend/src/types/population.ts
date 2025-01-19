import { Response } from "@/types/general";
import { PrefCode } from "@/types/prefecture";

export type PopulationComposition = {
  boundaryYear: number;
  data: {
    label: string;
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
