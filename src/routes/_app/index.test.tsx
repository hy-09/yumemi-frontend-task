import { renderWithProviders } from "@/main-test";
import App from "@/routes/_app";
import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

describe("App", () => {
  test("初期レンダリングが正しく行われる", async () => {
    renderWithProviders(<App />);
    expect(screen.getByText("都道府県別 人口推移グラフ")).toBeInTheDocument();
  });
});
