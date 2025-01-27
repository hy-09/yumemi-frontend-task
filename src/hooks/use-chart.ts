import useFetchPopulationComposition from "@/hooks/use-fetch-population-composition";
import { generateLineColors } from "@/lib/utils";
import {
  PopulationComposition,
  PopulationCompositionLabel,
} from "@/types/population";
import { Prefecture } from "@/types/prefecture";
import { useEffect, useState } from "react";

const useChart = ({
  selectedPrefCodes,
  selectedPrefectures,
  selectedLabel,
}: {
  selectedPrefCodes: Prefecture["prefCode"][];
  selectedPrefectures: Prefecture[];
  selectedLabel: PopulationCompositionLabel;
}) => {
  const labelStyle = { fontSize: "12px", fill: "#888" };
  const { mutate: fetchPopulationComposition } =
    useFetchPopulationComposition();

  const [populationCompositions, setPopulationCompositions] = useState<
    (Prefecture & { data: PopulationComposition })[]
  >([]);

  const fetchedPrefCodes = populationCompositions.map((c) => c.prefCode);

  useEffect(() => {
    selectedPrefectures.forEach((prefecture) => {
      const { prefCode } = prefecture;
      // 未取得の都道府県のみfetchする
      if (!fetchedPrefCodes.includes(prefCode)) {
        fetchPopulationComposition(
          { prefCode },
          {
            onSuccess: (data) =>
              setPopulationCompositions((prev) => [
                ...prev,
                { ...prefecture, data },
              ]),
          }
        );
      }
    });
  }, [selectedPrefectures]);

  const selectedPopulationCompositions = populationCompositions.filter((c) =>
    selectedPrefCodes.includes(c.prefCode)
  );
  const years =
    selectedPopulationCompositions[0]?.data.data
      .find((section) => section.label === selectedLabel)
      ?.data.map((data) => data.year) || [];

  const chartData = years.map((year) => {
    const records = selectedPopulationCompositions.reduce((acc, c) => {
      const value = c.data.data
        .find((section) => section.label === selectedLabel)
        ?.data.find((data) => data.year === year)?.value;
      return {
        ...acc,
        [c.prefName]: value ? value / 10000 : undefined,
      };
    }, {});
    return {
      year,
      ...records,
    };
  });

  const lineColors = generateLineColors(selectedPrefectures.length);

  return {
    labelStyle,
    chartData,
    lineColors,
  };
};

export default useChart;
