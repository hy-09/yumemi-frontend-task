import { Response } from "./general";
import { PrefCode } from "./prefecture";

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
