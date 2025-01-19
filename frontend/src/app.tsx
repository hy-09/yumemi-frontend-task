import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import usePrefectures from "@/hooks/use-prefectures";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="bg-gray-50 w-full h-full min-h-screen py-4">
      <div className="container mx-auto">
        <Card>
          <CardHeader className="text-xl">
            都道府県別　総人口推移グラフ
          </CardHeader>
          <CardContent>
            <ErrorBoundary
              FallbackComponent={() => <p>予期しないエラーが発生しました。</p>}
            >
              <Suspense fallback={<SuspenseFallback />}>
                <Content />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Content() {
  const { data: prefectures } = usePrefectures();
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2">
        {prefectures.map((prefecture) => {
          const id = `prefecture-${prefecture.prefCode}`;
          return (
            <div className="inline-block space-x-1">
              <input type="checkbox" id={id} className="cursor-pointer" />
              <label htmlFor={id} className="cursor-pointer">
                {prefecture.prefName}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
