import { renderWithProviders } from "@/main-test";
import PrefecturesSection from "@/routes/_app/-components/prefectures-section";
import { Prefecture } from "@/types/prefecture";
import { fireEvent, screen, within } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, test } from "vitest";

const Wrapper = () => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<
    Prefecture["prefCode"][]
  >([]);
  return (
    <PrefecturesSection
      selectedPrefCodes={selectedPrefCodes}
      setSelectedPrefCodes={setSelectedPrefCodes}
    />
  );
};

describe("PrefecturesSection", () => {
  test("初期レンダリングが正常に行われる", async () => {
    renderWithProviders(<Wrapper />);
    expect(await screen.findByText("チェックボックス")).toBeInTheDocument();
    expect(await screen.findByText("プルダウン")).toBeInTheDocument();
    expect(await screen.findByText("北海道")).toBeInTheDocument();
  });

  test("タブを切り替えると表示内容が変わる", async () => {
    renderWithProviders(<Wrapper />);

    const container = document.getElementById("prefectures")!;

    fireEvent.click(screen.getByText("チェックボックス"));
    const checkbox = within(container).getAllByRole("checkbox")[0];
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(screen.getByText("プルダウン"));
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
