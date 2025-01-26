import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePrefectures from "@/hooks/use-prefectures";
import ChartSection from "@/routes/_app/-components/chart-section";
import LabelSelectSection from "@/routes/_app/-components/label-select-section";
import PrefecturesSection from "@/routes/_app/-components/prefectures-section";
import { PopulationCompositionLabel } from "@/types/population";
import { Prefecture } from "@/types/prefecture";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  return (
    <main className="bg-gray-100 w-full h-full min-h-screen py-4">
      <div className="container mx-auto max-w-5xl">
        <Card>
          <CardHeader>
            <h1
              className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradientMove 4s infinite alternate",
              }}
            >
              {"都道府県別 人口推移グラフ"}
            </h1>
          </CardHeader>
          <CardContent>
            <ErrorBoundary
              FallbackComponent={() => <p>予期しないエラーが発生しました。</p>}
            >
              <Suspense fallback={<SuspenseFallback />}>
                <Index />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

const Index = () => {
  const { data: prefectures } = usePrefectures();
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<
    Prefecture["prefCode"][]
  >([]);
  const selectedPrefectures = prefectures.filter((prefecture) =>
    selectedPrefCodes.includes(prefecture.prefCode)
  );

  const [selectedLabel, setSelectedLabel] =
    useState<PopulationCompositionLabel>("総人口");

  return (
    <div className="space-y-6 sm:space-y-12">
      <PrefecturesSection
        selectedPrefCodes={selectedPrefCodes}
        setSelectedPrefCodes={setSelectedPrefCodes}
      />
      <LabelSelectSection setSelectedLabel={setSelectedLabel} />
      <ChartSection
        selectedPrefCodes={selectedPrefCodes}
        selectedPrefectures={selectedPrefectures}
        selectedLabel={selectedLabel}
      />
    </div>
  );
};

const SuspenseFallback = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

export default App;
