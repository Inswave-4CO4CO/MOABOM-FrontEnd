import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import FilterBox from "../components/FilterBox";
import Dropdown from "../components/Dropdown";
import CheckBox from "../components/CheckBox";
import PosterCard from "../components/PosterCard";
import { createListCollection, Text } from "@chakra-ui/react";
import OttButtonList, { ottList } from "../components/OttButtonList";
import { fetchSearchResults } from "../services/searchPageService";
import TabComponent from "../components/Tab";
import ProfileIcon from "../components/ProfileIcon";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  SearchContainer,
  SelectedFiltersWrapper,
  FilterLabel,
  SelectedFiltersContainer,
  FilterBoxWrapper,
  CloseIcon,
  SearchContent,
  FilterSection,
  FilterContainer,
  GenreGroup,
  CategoryGroup,
  FilterTitle,
  GenreOptionsGrid,
  CategoryOptionsGrid,
  FilterOption,
  VerticalDivider,
  ResultsSection,
  ProfileGrid,
  ErrorMessage,
  LoadingMessage,
  NoResults,
  ControlsContainer,
  LoadingMoreMessage,
  ProfileIconWrapper,
} from "../styles/pages/SearchPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInitialStateFromUrlParams } from "../utils/urlUtils";

// OTT 이름 배열 추가
const allOttNames = ottList.map((ott) => ott.alt);

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSyncingUrl = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // getInitialStateFromUrlParams 함수를 사용하여 초기 상태 설정
  const {
    initialKeyword,
    initialFilters,
    initialOtts,
    initialType,
    initialSort,
  } = getInitialStateFromUrlParams(location.search, allOttNames);

  const [searchQuery, setSearchQuery] = useState(initialKeyword);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [selectedOtts, setSelectedOtts] = useState(initialOtts);
  const [searchText, setSearchText] = useState(initialKeyword);
  const [activeTab, setActiveTab] = useState(initialType);
  const [sort, setSort] = useState(initialSort);
  const [genreItems, setGenreItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    // URL → state 동기화 시작
    isSyncingUrl.current = true;
    const params = new URLSearchParams(location.search);

    // 1) 검색어
    const keyword = params.get("keyword") || "";
    setSearchQuery((prev) => (prev === keyword ? prev : keyword));
    setSearchText((prev) => (prev === keyword ? prev : keyword));

    // 2) 필터
    const genres = (params.get("genres") || "")
      .split(",")
      .filter(Boolean)
      .map((genre) => ({ label: genre, value: `genre_${genre}` }));
    const categories = (params.get("categories") || "")
      .split(",")
      .filter(Boolean)
      .map((category) => ({ label: category, value: `category_${category}` }));
    const newFilters = [...genres, ...categories];
    setSelectedFilters((prevFilters) => {
      if (
        prevFilters.length === newFilters.length &&
        prevFilters.every(
          (filterItem, index) => filterItem.value === newFilters[index].value
        )
      ) {
        return prevFilters;
      }
      return newFilters;
    });

    // 3) OTT
    const ottsParam = params.get("otts");
    const newOtts = ottsParam ? ottsParam.split(",") : allOttNames;
    setSelectedOtts((prevOtts) => {
      if (
        prevOtts.length === newOtts.length &&
        prevOtts.every((ottItem, index) => ottItem === newOtts[index])
      ) {
        return prevOtts;
      }
      return newOtts;
    });

    // 4) 탭
    const typeParam = params.get("type");
    setActiveTab((prev) =>
      typeParam && prev !== typeParam ? typeParam : prev
    );

    // 5) 정렬 (추가)
    const sortParam = params.get("sort");
    setSort((prev) => (sortParam && prev !== sortParam ? sortParam : prev));

    // URL → state 동기화 완료
    // setTimeout을 사용하여 React의 다음 렌더링 사이클로 동기화 완료 시점을 옮김
    setTimeout(() => {
      isSyncingUrl.current = false;
    }, 0);
  }, [location.search]);

  useEffect(() => {
    // if (isSyncingUrl.current) return; // 임시 주석 처리
    // state → URL 업데이트 (replace)
    const params = new URLSearchParams();

    // 2) 검색어
    if (searchText.trim()) {
      params.set("keyword", searchText.trim());
    }

    // 3) 장르 필터 (genre_ 제거)
    const genreValues = selectedFilters
      .filter((filterItem) => filterItem.value.startsWith("genre_"))
      .map((filterItem) => filterItem.value.replace("genre_", ""));
    if (genreValues.length > 0) {
      // .length > 0 조건 추가
      params.set("genres", genreValues.join(","));
    }

    // 4) 카테고리 필터
    const categoryValues = selectedFilters
      .filter((filterItem) => filterItem.value.startsWith("category_"))
      .map((filterItem) => filterItem.value.replace("category_", ""));
    if (categoryValues.length > 0) {
      // .length > 0 조건 추가
      params.set("categories", categoryValues.join(","));
    }

    // 5) OTT 필터 (전체가 아닐 때만)
    if (selectedOtts.length > 0 && selectedOtts.length !== allOttNames.length) {
      params.set("otts", selectedOtts.join(","));
    }

    // 6) 정렬 순서 (debouncedSort 대신 sort 사용)
    if (sort) {
      // debouncedSort -> sort
      params.set("sort", sort); // debouncedSort -> sort
    }

    // 7) 탭 타입
    if (activeTab && activeTab !== "content") {
      params.set("type", activeTab);
    }

    // 8) URL 반영 (replace: true 로 히스토리 누적 방지)
    setSearchParams(params, { replace: true });
  }, [
    searchText,
    selectedFilters,
    selectedOtts,
    sort, // debouncedSort -> sort
    activeTab,
    setSearchParams,
  ]);

  const handlePersonClick = (personId) => {
    navigate(`/person/${personId}`);
  };

  const handleContentClick = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  const tabList = [
    { label: "작품", value: "content" },
    { label: "배우", value: "cast" },
    { label: "감독/작가", value: "crew" },
  ];

  // React Query 무한 스크롤 훅 (콜백 정의 전에 선언)
  const {
    data,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    isLoading: isQueryLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "search",
      searchText,
      selectedFilters
        .map((filterItem) => filterItem.value)
        .sort()
        .join(","),
      selectedOtts.sort().join(","),
      sort,
      activeTab,
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetchSearchResults({
        searchText,
        selectedFilters,
        selectedOtts,
        allOttNames,
        sort,
        activeTab,
        pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const observer = useRef();
  const lastResultElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { rootMargin: "100px", threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const frameworks = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "인기순", value: "popularity" },
          { label: "최신순", value: "latest" },
          { label: "과거순", value: "oldest" },
        ],
      }),
    []
  );

  // 검색 응답 첫 페이지에서 필터 데이터를 설정
  useEffect(() => {
    if (data?.pages?.length > 0) {
      const firstPageData = data.pages[0];
      if (firstPageData.allGenres) {
        const genres = firstPageData.allGenres.map((genreName) => ({
          label: genreName,
          value: `genre_${genreName}`,
        }));
        setGenreItems(genres);
      }
      if (firstPageData.allCategories) {
        const categories = firstPageData.allCategories.map((categoryName) => ({
          label: categoryName,
          value: `category_${categoryName}`,
        }));
        setCategoryItems(categories);
      }
    }
  }, [data]);

  const handleOttSelect = (ottName) => {
    setSelectedOtts((prevSelectedOtts) => {
      const isSelected = prevSelectedOtts.includes(ottName);

      if (prevSelectedOtts.length === allOttNames.length) {
        // 전체 선택 상태에서 클릭하면 해당 하나만 남김
        return [ottName];
      } else {
        const updatedOtts = isSelected
          ? prevSelectedOtts.filter((ott) => ott !== ottName)
          : [...prevSelectedOtts, ottName];

        // 아무것도 선택되지 않으면 다시 전체 선택
        return updatedOtts.length === 0 ? [...allOttNames] : updatedOtts;
      }
    });
  };

  const handleSortChange = (sortValue) => {
    setSort(sortValue);
  };

  const handleFilterChange = (filterItem) => {
    setSelectedFilters((prevFilters) => {
      if (
        prevFilters.some((prevFilter) => prevFilter.value === filterItem.value)
      ) {
        return prevFilters.filter(
          (prevFilter) => prevFilter.value !== filterItem.value
        );
      }
      return [...prevFilters, filterItem];
    });
  };

  const handleRemoveFilter = (filterValue) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.value !== filterValue)
    );
  };

  const FilterCheckBox = ({ item }) => {
    const isChecked = selectedFilters.some(
      (filterItem) => filterItem.value === item.value
    );

    const handleItemClick = () => {
      handleFilterChange(item);
    };

    return (
      <CheckBox checked={isChecked} onChange={handleItemClick}>
        {item.label}
      </CheckBox>
    );
  };

  const handleTabClick = (value) => {
    // 탭 값 설정 후 스크롤을 최상단으로 이동
    const tabValue =
      typeof value === "object" && value !== null ? value.value : value;
    setActiveTab(tabValue);
    window.scrollTo(0, 0);
  };

  return (
    <SearchContainer>
      {searchText && (
        <Text
          textAlign="center"
          fontSize="30px"
          fontWeight="bold"
          marginTop={30}
          marginBottom={30}
        >
          "{searchText}" 검색 결과
        </Text>
      )}

      <TabComponent
        list={tabList}
        value={activeTab}
        onTabChange={handleTabClick}
      />

      {/* 작품 탭일 때만 필터 컴포넌트들 렌더링 */}
      {activeTab === "content" && (
        <>
          {selectedFilters.length > 0 && (
            <SelectedFiltersWrapper>
              <FilterLabel>선택한 필터</FilterLabel>
              <SelectedFiltersContainer>
                {selectedFilters.map((filterItem) => (
                  <FilterBoxWrapper key={filterItem.value}>
                    <FilterBox
                      onClick={() => handleRemoveFilter(filterItem.value)}
                    >
                      {filterItem.label} <CloseIcon>×</CloseIcon>
                    </FilterBox>
                  </FilterBoxWrapper>
                ))}
              </SelectedFiltersContainer>
            </SelectedFiltersWrapper>
          )}

          {queryError && (
            <ErrorMessage>
              검색 중 오류가 발생했습니다. 다시 시도해주세요.
            </ErrorMessage>
          )}

          <SearchContent>
            <FilterSection>
              <FilterContainer>
                <GenreGroup>
                  <FilterTitle>장르</FilterTitle>
                  <GenreOptionsGrid>
                    {genreItems.map((item) => (
                      <FilterOption key={item.value}>
                        <FilterCheckBox item={item} />
                      </FilterOption>
                    ))}
                  </GenreOptionsGrid>
                </GenreGroup>

                <VerticalDivider />

                <CategoryGroup>
                  <FilterTitle>카테고리</FilterTitle>
                  <CategoryOptionsGrid>
                    {categoryItems.map((item) => (
                      <FilterOption key={item.value}>
                        <FilterCheckBox item={item} />
                      </FilterOption>
                    ))}
                  </CategoryOptionsGrid>
                </CategoryGroup>
              </FilterContainer>

              <ControlsContainer>
                <OttButtonList
                  onToggleOtt={handleOttSelect}
                  selectedOtts={selectedOtts}
                />
                <Dropdown
                  list={frameworks}
                  onChange={handleSortChange}
                  defaultValue={sort}
                />
              </ControlsContainer>
            </FilterSection>
          </SearchContent>
        </>
      )}

      {/* 에러 메시지는 모든 탭에서 표시 */}
      {activeTab !== "content" && queryError && (
        <ErrorMessage>
          검색 중 오류가 발생했습니다. 다시 시도해주세요.
        </ErrorMessage>
      )}

      <ResultsSection $isContentTab={activeTab === "content"}>
        {isQueryLoading ? (
          <LoadingMessage>검색 결과를 불러오는 중...</LoadingMessage>
        ) : data?.pages?.flatMap(
            (pageData) =>
              pageData.content ?? pageData.cast ?? pageData.crew ?? []
          ).length > 0 ? (
          <>
            {activeTab === "content" &&
              // 작품 탭일 때 PosterCard 렌더링
              data.pages
                .flatMap((pageData) => pageData.content ?? [])
                .map((resultItem, index, array) => {
                  console.log(
                    "Rendering PosterCard with title:",
                    resultItem.title
                  );
                  return (
                    <PosterCard
                      key={`${resultItem.contentId}-${index}`}
                      ref={
                        index === array.length - 1 ? lastResultElementRef : null
                      }
                      onClick={() => handleContentClick(resultItem.contentId)}
                      src={resultItem.poster}
                      title={resultItem.title}
                      ottname={resultItem.ottname || ""}
                    />
                  );
                })}

            {activeTab === "cast" && (
              // 배우 탭일 때 ProfileIcon 렌더링
              <ProfileGrid>
                {data.pages
                  .flatMap((pageData) => pageData.cast ?? [])
                  .map((personItem, index, array) => (
                    <ProfileIconWrapper
                      key={`${personItem.personId}-${index}`}
                      onClick={() => handlePersonClick(personItem.personId)}
                      ref={
                        index === array.length - 1 ? lastResultElementRef : null
                      }
                    >
                      <ProfileIcon
                        imagePath={
                          personItem.image ||
                          "https://via.placeholder.com/100x100?text=No+Image"
                        }
                        name={personItem.personName}
                      />
                    </ProfileIconWrapper>
                  ))}
              </ProfileGrid>
            )}

            {activeTab === "crew" && (
              // 감독/작가 탭일 때 ProfileIcon 렌더링
              <ProfileGrid>
                {data.pages
                  .flatMap((pageData) => pageData.crew ?? [])
                  .map((personItem, index, array) => (
                    <ProfileIconWrapper
                      key={`${personItem.personId}-${index}`}
                      onClick={() => handlePersonClick(personItem.personId)}
                      ref={
                        index === array.length - 1 ? lastResultElementRef : null
                      }
                    >
                      <ProfileIcon
                        imagePath={
                          personItem.image ||
                          "https://via.placeholder.com/100x100?text=No+Image"
                        }
                        name={personItem.personName}
                      />
                    </ProfileIconWrapper>
                  ))}
              </ProfileGrid>
            )}

            {isFetchingNextPage && (
              <LoadingMoreMessage>
                더 많은 결과를 불러오는 중...
              </LoadingMoreMessage>
            )}
          </>
        ) : (
          <NoResults>
            {searchText.trim() || selectedFilters.length > 0
              ? "검색 결과가 없습니다."
              : "검색어 또는 필터를 선택해주세요."}
          </NoResults>
        )}
      </ResultsSection>
    </SearchContainer>
  );
};

export default SearchPage;
