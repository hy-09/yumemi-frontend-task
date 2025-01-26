import { FetchPopulationComposition } from "@/types/population";
import { http, HttpResponse } from "msw";

const mockResponse: FetchPopulationComposition["Response"] = {
  message: "string",
  result: {
    boundaryYear: 2020,
    data: [
      {
        label: "総人口",
        data: [
          {
            year: 2000,
            value: 100000,
            rate: 33.3,
          },
        ],
      },
    ],
  },
};

export const populationCompositionHandler = http.get(
  `${import.meta.env.VITE_API_URL}/api/v1/population/composition/perYear`,
  (info) => {
    if (!info.request.headers.get("X-API-KEY"))
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(info.request.url);

    if (!searchParams.get("prefCode"))
      return HttpResponse.json(
        { message: "Missing required query parameter" },
        { status: 400 }
      );

    return HttpResponse.json(mockResponse, { status: 200 });
  }
);
