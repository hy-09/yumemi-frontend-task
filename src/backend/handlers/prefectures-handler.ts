import { Response } from "@/types/general";
import { Prefecture } from "@/types/prefecture";
import { http, HttpResponse } from "msw";

const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森" },
  { prefCode: 3, prefName: "岩手" },
];

const mockResponse: Response<Prefecture[]> = {
  message: "string",
  result: mockPrefectures,
};

export const prefecturesHandler = http.get(
  `${import.meta.env.VITE_API_URL}/api/v1/prefectures`,
  () => {
    return HttpResponse.json(mockResponse, { status: 200 });
  }
);
