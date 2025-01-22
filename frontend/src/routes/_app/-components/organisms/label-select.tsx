import { POPULATION_COMPOSITION__AGE_LABELS } from "@/consts/population-composition";
import { PopulationCompositionLabel } from "@/types/population";

const LabelSelect = ({
  setSelectedLabel,
}: {
  setSelectedLabel: React.Dispatch<
    React.SetStateAction<PopulationCompositionLabel>
  >;
}) => {
  return (
    <div className="text-end">
      <select
        className="p-1 border rounded-sm cursor-pointer"
        onChange={(e) =>
          setSelectedLabel(e.target.value as PopulationCompositionLabel)
        }
      >
        {POPULATION_COMPOSITION__AGE_LABELS.map((label) => (
          <option key={label}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default LabelSelect;
