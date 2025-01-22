import { Button } from "@/components/button";
import usePrefectures from "@/hooks/use-prefectures";
import LabeledCheckbox from "@/routes/_app/-components/atoms/labeled-checkbox";
import { Prefecture } from "@/types/prefecture";
import { memo } from "react";

const PrefectureCheckBoxes = memo(
  ({
    selectedPrefectures,
    setSelectedPrefectures,
  }: {
    selectedPrefectures: Prefecture[];
    setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
  }) => {
    const { data: prefectures } = usePrefectures();
    const selectedPrefCodes = selectedPrefectures.map((p) => p.prefCode);
    const clearSelectedPrefectures = () => setSelectedPrefectures([]);

    return (
      <div className="space-y-4">
        <div className="text-end">
          <Button
            variant="outline"
            size="sm"
            onClick={clearSelectedPrefectures}
          >
            選択解除
          </Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {prefectures.map((prefecture) => (
            <LabeledCheckbox
              prefecture={prefecture}
              setSelectedPrefectures={setSelectedPrefectures}
              key={prefecture.prefCode}
              checked={selectedPrefCodes.includes(prefecture.prefCode)}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default PrefectureCheckBoxes;
