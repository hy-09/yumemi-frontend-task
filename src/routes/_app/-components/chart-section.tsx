import useChart from "@/hooks/use-chart";
import { PopulationCompositionLabel } from "@/types/population";
import { Prefecture } from "@/types/prefecture";
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

const ChartSection = ({
  selectedPrefCodes,
  selectedPrefectures,
  selectedLabel,
}: {
  selectedPrefCodes: Prefecture["prefCode"][];
  selectedPrefectures: Prefecture[];
  selectedLabel: PopulationCompositionLabel;
}) => {
  const { labelStyle, chartData, lineColors } = useChart({
    selectedPrefCodes,
    selectedPrefectures,
    selectedLabel,
  });

  return (
    <div id="chart" className="w-full aspect-w-16 aspect-h-9 min-h-80">
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

export default ChartSection;
