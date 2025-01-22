import usePrefectures from "@/hooks/use-prefectures";
import LabeledCheckbox from "@/routes/_app/-components/atoms/labeled-checkbox";
import { Prefecture } from "@/types/prefecture";

const PrefectureCheckBoxes = ({
  setSelectedPrefectures,
}: {
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
}) => {
  const { data: prefectures } = usePrefectures();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {prefectures.map((prefecture) => (
        <LabeledCheckbox
          prefecture={prefecture}
          setSelectedPrefectures={setSelectedPrefectures}
          key={prefecture.prefCode}
        />
      ))}
    </div>
  );
};

export default PrefectureCheckBoxes;
