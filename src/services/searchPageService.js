import { baseInstance } from "./axiosInstance";
import { DOMAIN } from "./domain";

export const fetchSearchResults = async ({
  searchText,
  selectedFilters,
  selectedOtts,
  allOttNames, // SearchPage.jsx 로부터 전달받을 allOttNames
  sort,
  activeTab,
  pageParam = 0,
}) => {
  const genres = selectedFilters
    .filter((filterItem) => filterItem.value.startsWith("genre_"))
    .map((filterItem) => filterItem.value.replace("genre_", ""));
  const categories = selectedFilters
    .filter((filterItem) => filterItem.value.startsWith("category_"))
    .map((filterItem) => filterItem.value.replace("category_", ""));

  const queryParams = {
    keyword: searchText.trim() || null,
    genres: genres.length ? genres.join(",") : null,
    categories: categories.length ? categories.join(",") : null,
    otts:
      selectedOtts.length !== allOttNames.length
        ? selectedOtts.join(",")
        : null,
    sort: sort,
    type: activeTab,
    page: pageParam,
  };

  Object.keys(queryParams).forEach(
    (key) => queryParams[key] == null && delete queryParams[key]
  );

  const response = await baseInstance.get(DOMAIN.SEARCH, {
    params: queryParams,
    paramsSerializer: (params) => {
      const sp = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => sp.append(key, v));
        } else {
          sp.append(key, value);
        }
      });
      return sp.toString();
    },
  });
  // 기존 SearchPage.jsx의 .then(res => ({ ...res.data, page: pageParam })) 부분과 동일하게 반환
  return { ...response.data, page: pageParam };
};
