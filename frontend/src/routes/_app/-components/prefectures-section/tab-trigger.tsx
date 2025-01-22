import { cn } from "@/lib/utils";
import { Tab, TabKey } from "@/routes/_app/-components/prefectures-section";
import { memo } from "react";

const TabTrigger = memo(
  ({
    tab,
    selectedTab,
    setSelectedTab,
  }: {
    tab: Tab;
    selectedTab: TabKey;
    setSelectedTab: React.Dispatch<React.SetStateAction<TabKey>>;
  }) => {
    const isSelected = selectedTab === tab.key;
    return (
      <li
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          isSelected && "bg-background text-foreground shadow-sm"
        )}
        onClick={() => setSelectedTab(tab.key)}
      >
        {tab.value}
      </li>
    );
  }
);

TabTrigger.displayName = "TabTrigger";

export default TabTrigger;
