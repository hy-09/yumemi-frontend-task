import usePrefectures from "@/hooks/use-prefectures";
import { Prefecture } from "@/types/prefecture";
import React, { memo } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

type Option = {
  value: Prefecture["prefCode"];
  label: string;
};

const animatedComponents = makeAnimated();

const PrefecturePulldown = memo(
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
    const options: Option[] = prefectures.map((prefecture) => ({
      value: prefecture.prefCode,
      label: prefecture.prefName,
    }));

    const selectedOptions = options.filter((option) =>
      selectedPrefCodes.includes(option.value)
    );

    const onChange = (options: MultiValue<Option>) => {
      setSelectedPrefCodes(options.map((o) => o.value));
    };

    return (
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        value={selectedOptions}
        isMulti
        options={options}
        onChange={onChange}
        placeholder="都道府県を選択"
      />
    );
  }
);

PrefecturePulldown.displayName = "PrefecturePulldown";

export default PrefecturePulldown;
