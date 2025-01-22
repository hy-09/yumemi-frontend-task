import useFetchPopulationComposition from "@/hooks/use-fetch-population-composition";
import { generateLineColors } from "@/lib/utils";
import {
  PopulationComposition,
  PopulationCompositionLabel,
} from "@/types/population";
import { Prefecture } from "@/types/prefecture";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({
  selectedPrefectures,
  selectedLabel,
}: {
  selectedPrefectures: Prefecture[];
  selectedLabel: PopulationCompositionLabel;
}) => {
  const labelStyle = { fontSize: "12px", fill: "#888" };
  const { mutate: fetchPopulationComposition } =
    useFetchPopulationComposition();

  const [populationCompositions, setPopulationCompositions] = useState<
    (Prefecture & { data: PopulationComposition })[]
  >([]);

  const selectedPrefCodes = selectedPrefectures.map((p) => p.prefCode);
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

  return (
    <div className="w-full aspect-w-16 aspect-h-9 min-h-80">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year">
            <Label
              value="年度"
              offset={-10}
              position="insideBottom"
              style={labelStyle}
            />
          </XAxis>
          <YAxis>
            <Label
              value="人口数(万人)"
              angle={-90}
              position="insideLeft"
              style={labelStyle}
            />
          </YAxis>
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: 20 }} />
          {selectedPrefectures.map((prefecture, i) => (
            <Line
              key={prefecture.prefCode}
              type="monotone"
              dataKey={prefecture.prefName}
              stroke={lineColors[i]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
