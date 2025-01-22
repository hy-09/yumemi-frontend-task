import { Prefecture } from "@/types/prefecture";
import { memo } from "react";

const LabeledCheckbox = memo(
  ({
    prefecture,
    setSelectedPrefectures,
    checked,
  }: {
    prefecture: Prefecture;
    setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefecture[]>>;
    checked: boolean;
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
      <div className="flex items-center space-x-1">
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
          checked={checked}
        />
        <label htmlFor={id} className="cursor-pointer">
          {prefecture.prefName}
        </label>
      </div>
    );
  }
);

export default LabeledCheckbox;
