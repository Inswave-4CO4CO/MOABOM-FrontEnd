import { useState } from "react";

const allOttNames = [
  "넷플릭스",
  "웨이브",
  "쿠팡플레이",
  "왓챠",
  "티빙",
  "라프텔",
  "디즈니+",
  "Apple TV",
  "U+모바일tv",
];

export const useOttFilter = () => {
  const [selectedOtts, setSelectedOtts] = useState([...allOttNames]);

  const toggleOtt = (ottName) => {
    setSelectedOtts((prev) => {
      const isSelected = prev.includes(ottName);
      if (prev.length === allOttNames.length) return [ottName];

      const updated = isSelected
        ? prev.filter((o) => o !== ottName)
        : [...prev, ottName];

      return updated.length === 0 ? [...allOttNames] : updated;
    });
  };

  const filterIncludeSelected = (list) =>
    selectedOtts.length === 0
      ? list
      : list.filter((item) => selectedOtts.includes(item.ottName));

  return {
    selectedOtts,
    toggleOtt,
    filterIncludeSelected,
  };
};
