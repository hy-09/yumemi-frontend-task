import { fetchPopulationComposition, fetchPrefectures } from "@/backend/api";
import { describe, expect, test } from "vitest";

describe("fetchPrefectures", () => {
  test("都道府県一覧が正しく取得できる", async () => {
    const prefectures = await fetchPrefectures();

    expect(prefectures).toBeInstanceOf(Array);
    expect(prefectures.length).toBeGreaterThan(0);
    expect(prefectures[0]).toHaveProperty("prefCode");
    expect(prefectures[0]).toHaveProperty("prefName");
  });
});

describe("fetchPopulationComposition", () => {
  test("人口構成が正しく取得できる", async () => {
    const populationCpmposition = await fetchPopulationComposition({
      prefCode: 1,
    });

    expect(populationCpmposition).toBeInstanceOf(Object);
    expect(populationCpmposition).toHaveProperty("boundaryYear");
    expect(populationCpmposition).toHaveProperty("data");
  });
});
