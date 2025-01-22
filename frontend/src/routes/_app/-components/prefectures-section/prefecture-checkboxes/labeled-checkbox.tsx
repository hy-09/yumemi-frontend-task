import { Prefecture } from "@/types/prefecture";
import { memo } from "react";

const LabeledCheckbox = memo(
  ({
    prefecture,
    setSelectedPrefCodes,
    checked,
  }: {
    prefecture: Prefecture;
    setSelectedPrefCodes: React.Dispatch<
      React.SetStateAction<Prefecture["prefCode"][]>
    >;
    checked: boolean;
  }) => {
    const { prefCode } = prefecture;
    const id = `prefecture-${prefCode}`;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedPrefCodes((prev) => [...prev, prefecture.prefCode]);
      } else {
        setSelectedPrefCodes((prev) => prev.filter((p) => p !== prefCode));
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
          onChange={onChange}
          checked={checked}
        />
        <label htmlFor={id} className="cursor-pointer">
          {prefecture.prefName}
        </label>
      </div>
    );
  }
);

LabeledCheckbox.displayName = "LabeledCheckbox";

export default LabeledCheckbox;
