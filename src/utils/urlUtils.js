// URL 파라미터로부터 초기 상태를 가져오는 헬퍼 함수
export const getInitialStateFromUrlParams = (search, allOttNames) => {
  const params = new URLSearchParams(search);
  const initialKeyword = params.get("keyword") || "";
  const initialGenres = (params.get("genres") || "")
    .split(",")
    .filter(Boolean)
    .map((genre) => ({ label: genre, value: `genre_${genre}` }));
  const initialCategories = (params.get("categories") || "")
    .split(",")
    .filter(Boolean)
    .map((category) => ({ label: category, value: `category_${category}` }));
  const initialFilters = [...initialGenres, ...initialCategories];
  const initialOtts = params.get("otts")
    ? params.get("otts").split(",")
    : [...allOttNames];
  const initialType = params.get("type") || "content";
  const initialSort = params.get("sort") || "popularity";

  return {
    initialKeyword,
    initialFilters,
    initialOtts,
    initialType,
    initialSort,
  };
};
