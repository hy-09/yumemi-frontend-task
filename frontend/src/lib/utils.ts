import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateLineColors(lineCount: number) {
  const colors = [];
  for (let i = 0; i < lineCount; i++) {
    // 色相を線の数で均等に分割 (0~360)
    const hue = (i * 360) / lineCount;
    colors.push(`hsl(${hue}, 70%, 50%)`); // 彩度: 70%, 輝度: 50%
  }
  return colors;
}
