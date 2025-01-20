import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { POPULATION_COMPOSITION__AGE_LABELS } from "@/consts/population-composition";
import useFetchPopulationComposition from "@/hooks/use-fetch-population-composition";
import usePrefectures from "@/hooks/use-prefectures";
import { generateLineColors } from "@/lib/utils";
import {
  PopulationComposition,
  PopulationCompositionLabel,
} from "@/types/population";
import { Prefecture } from "@/types/prefecture";
import { Suspense, memo, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts";

function App() {
  return (
    <>
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
      </style>
      <div className="bg-gray-100 w-full h-full min-h-screen py-4">
        <div className="container mx-auto max-w-5xl">
          <Card>
            <CardHeader className="text-xl">
              <h1
                className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 200%",
                  animation: "gradientMove 4s infinite alternate",
                }}
              >
                都道府県別　総人口推移グラフ
              </h1>
            </CardHeader>
            <CardContent>
              <ErrorBoundary
                FallbackComponent={() => (
                  <p>予期しないエラーが発生しました。</p>
                )}
              >
                <Suspense fallback={<SuspenseFallback />}>
                  <Index />
                </Suspense>
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function Index() {
  const { data: prefectures } = usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    []
  );

  const [selectedLabel, setSelectedLabel] =
    useState<PopulationCompositionLabel>("総人口");

  return (
    <div className="space-y-12">
      <PrefectureCheckBoxes
        prefectures={prefectures}
        setSelectedPrefectures={setSelectedPrefectures}
      />
      <LabelSelect setSelectedLabel={setSelectedLabel} />
      <Chart
        selectedPrefectures={selectedPrefectures}
        selectedLabel={selectedLabel}
      />
    </div>
  );
}

const PrefectureCheckBoxes = memo(
  ({
    prefectures,
    setSelectedPrefectures,
  }: {
    prefectures: Prefecture[];
    setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
  }) => {
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
  }
);

const LabelSelect = memo(
  ({
    setSelectedLabel,
  }: {
    setSelectedLabel: React.Dispatch<
      React.SetStateAction<PopulationCompositionLabel>
    >;
  }) => {
    return (
      <div className="text-end">
        <select
          className="border rounded-sm cursor-pointer"
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
  }
);

const LabeledCheckbox = ({
  prefecture,
  setSelectedPrefectures,
}: {
  prefecture: Prefecture;
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
}) => {
  const { prefCode } = prefecture;
  const id = `prefecture-${prefCode}`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedPrefectures((data) => [...data, prefecture]);
    } else {
      setSelectedPrefectures((data) =>
        data.filter((p) => p.prefCode !== prefCode)
      );
    }
  };

  return (
    <div className="flex align-middle space-x-1">
      <input
        type="checkbox"
        id={id}
        className="w-5 h-5 rounded-md appearance-none 
                   border border-gray-400 
                   transition-all duration-300 ease-in-out
                   bg-gray-300
                   checked:bg-gradient-to-r checked:from-pink-500 checked:to-yellow-500
                   checked:border-none checked:shadow-lg checked:scale-110
                   checked:animate-gradientMove cursor-pointer"
        style={{
          backgroundSize: "200% 200%",
          animation: "gradientMove 4s infinite alternate",
        }}
        onChange={handleChange}
      />
      <label htmlFor={id} className="cursor-pointer">
        {prefecture.prefName}
      </label>
    </div>
  );
};

const Chart = memo(
  ({
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
  }
);

function SuspenseFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default App;
