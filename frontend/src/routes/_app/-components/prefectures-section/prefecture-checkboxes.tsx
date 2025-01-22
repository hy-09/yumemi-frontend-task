import { Button } from "@/components/button";
import usePrefectures from "@/hooks/use-prefectures";
import LabeledCheckbox from "@/routes/_app/-components/prefectures-section/prefecture-checkboxes/labeled-checkbox";
import { Prefecture } from "@/types/prefecture";
import { memo } from "react";

const PrefectureCheckBoxes = memo(
  ({
    selectedPrefCodes,
    setSelectedPrefCodes,
  }: {
    selectedPrefCodes: Prefecture["prefCode"][];
    setSelectedPrefCodes: React.Dispatch<
      React.SetStateAction<Prefecture["prefCode"][]>
    >;
  }) => {
    const { data: prefectures } = usePrefectures();
    const clearSelectedPrefCodes = () => setSelectedPrefCodes([]);

    return (
      <div className="space-y-4">
        <div className="text-end">
          <Button variant="outline" size="sm" onClick={clearSelectedPrefCodes}>
            選択解除
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {prefectures.map((prefecture) => (
            <LabeledCheckbox
              prefecture={prefecture}
              setSelectedPrefCodes={setSelectedPrefCodes}
              key={prefecture.prefCode}
              checked={selectedPrefCodes.includes(prefecture.prefCode)}
            />
          ))}
        </div>
      </div>
    );
  }
);

PrefectureCheckBoxes.displayName = "PrefectureCheckBoxes";

export default PrefectureCheckBoxes;
