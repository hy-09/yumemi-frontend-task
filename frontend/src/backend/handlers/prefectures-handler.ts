import { Response } from "@/types/general";
import { Prefecture } from "@/types/prefecture";
import { http, HttpResponse } from "msw";

const mockPrefectures: Prefecture[] = [{ prefCode: 1, prefName: "北海道" }];

const mockResponse: Response<Prefecture[]> = {
  message: "string",
  result: mockPrefectures,
};

export const prefecturesHandler = http.get(
  `${import.meta.env.VITE_API_ENDPOINT}/api/v1/prefectures`,
  () => {
    return HttpResponse.json(mockResponse, { status: 200 });
  }
);
