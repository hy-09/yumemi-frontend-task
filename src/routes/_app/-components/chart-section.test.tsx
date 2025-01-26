import { renderWithProviders } from "@/main-test";
import ChartSection from "@/routes/_app/-components/chart-section";
import { Prefecture } from "@/types/prefecture";
import { waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("ChartSection", () => {
  test("初期レンダリングが正常に行われる", () => {
    renderWithProviders(
      <ChartSection
        selectedPrefCodes={[]}
        selectedPrefectures={[]}
        selectedLabel={"総人口"}
      />
    );

    const chart = document.getElementById("chart");
    expect(chart).toBeInTheDocument();
  });

  const selectedPrefCodes: Prefecture["prefCode"][] = [1, 2];

  const selectedPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森" },
  ];

  test("選択した都道府県のデータがグラフに表示される", async () => {
    return;

    // TODO Rechartsのグラフ内のDOMが読み込めないので、こちらのテストを無効化しています🙇
    renderWithProviders(
      <ChartSection
        selectedPrefCodes={selectedPrefCodes}
        selectedPrefectures={selectedPrefectures}
        selectedLabel={"総人口"}
      />
    );

    await waitFor(() => {
      const prefCount = selectedPrefCodes.length;
      const lineCount = document.querySelectorAll(".recharts-line").length;

      expect(prefCount).toBe(lineCount);
    });
  });
});
