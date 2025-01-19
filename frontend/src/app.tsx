import usePrefectures from "@/hooks/use-prefectures";

function App() {
  const { data } = usePrefectures();
  console.log(data);

  return <div>dfas</div>;
}

export default App;
