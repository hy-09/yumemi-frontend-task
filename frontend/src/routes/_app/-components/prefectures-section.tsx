import PrefectureCheckBoxes from "@/routes/_app/-components/prefectures-section/prefecture-checkboxes";
import PrefecturePulldown from "@/routes/_app/-components/prefectures-section/prefecture-pulldown";
import TabTrigger from "@/routes/_app/-components/prefectures-section/tab-trigger";
import { Prefecture } from "@/types/prefecture";
import { useState } from "react";

export type TabKey = "checkbox" | "pulldown";
export type Tab = { key: TabKey; value: string };

const tabs: Tab[] = [
  { key: "checkbox", value: "チェックボックス" },
  { key: "pulldown", value: "プルダウン" },
];

const PrefecturesSection = ({
  selectedPrefCodes,
  setSelectedPrefCodes,
}: {
  selectedPrefCodes: Prefecture["prefCode"][];
  setSelectedPrefCodes: React.Dispatch<
    React.SetStateAction<Prefecture["prefCode"][]>
  >;
}) => {
  const [selectedTab, setSelectedTab] = useState<TabKey>("checkbox");
  return (
    <div>
      <ul className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        {tabs.map((tab) => (
          <TabTrigger
            key={tab.key}
            tab={tab}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      <div
        id="prefectures"
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {selectedTab === "checkbox" && (
          <PrefectureCheckBoxes
            selectedPrefCodes={selectedPrefCodes}
            setSelectedPrefCodes={setSelectedPrefCodes}
          />
        )}
        {selectedTab === "pulldown" && (
          <PrefecturePulldown
            selectedPrefCodes={selectedPrefCodes}
            setSelectedPrefCodes={setSelectedPrefCodes}
          />
        )}
      </div>
    </div>
  );
};

export default PrefecturesSection;
