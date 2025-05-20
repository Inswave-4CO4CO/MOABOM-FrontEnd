import React, { useState, useEffect, useRef, useCallback } from "react";
import FilterBox from "../components/FilterBox";
import Dropdown from "../components/Dropdown";
import CheckBox from "../components/CheckBox";
import PosterCard from "../components/PosterCard";
import { createListCollection, Text } from "@chakra-ui/react";
import OttButtonList, { ottList } from "../components/OttButtonList";
import axios from "axios";
import TabComponent from "../components/Tab";
import { ProfileIcon } from "../components/ProfileIcon";
import { useNavigate } from "react-router-dom";
import {
  SearchContainer,
  SearchHeader,
  SearchForm,
  SearchInput,
  SearchButton,
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
  PosterCardWrapper,
} from "../styles/pages/SearchPage";

// OTT 이름 배열 추가
const allOttNames = ottList.map((ott) => ott.alt);

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedOtts, setSelectedOtts] = useState([...allOttNames]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreItems, setGenreItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const navigate = useNavigate();

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

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    resetSearch();
    if (
      searchText.trim() ||
      selectedFilters.length > 0 ||
      selectedOtts.length > 0
    ) {
      setSearchQuery(searchText);
      fetchMoreResults(0);
    }
  };

  const observer = useRef();
  const lastResultElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("마지막 요소 감지, 다음 페이지 로드: ", page + 1);
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          rootMargin: "100px",
          threshold: 0.1,
        }
      );

      if (node) {
        console.log("마지막 요소 관찰 설정:", node);
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, page]
  );

  const API_URL = import.meta.env.VITE_API_URL;

  const frameworks = createListCollection({
    items: [
      { label: "인기순", value: "popularity" },
      { label: "최신순", value: "latest" },
      { label: "과거순", value: "oldest" },
    ],
  });

  useEffect(() => {
    const fetchInitialFilters = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/filters`);
        console.log("필터 데이터 로드:", response.data);

        if (response.data.allGenres && response.data.allGenres.length > 0) {
          const genres = response.data.allGenres.map((genre) => ({
            label: genre,
            value: `genre_${genre}`,
          }));
          setGenreItems(genres);
        }

        if (
          response.data.allCategories &&
          response.data.allCategories.length > 0
        ) {
          const categories = response.data.allCategories.map((category) => ({
            label: category,
            value: `category_${category}`,
          }));
          setCategoryItems(categories);
        }
      } catch (err) {
        console.error("필터 데이터 로드 오류:", err);

        try {
          const searchResponse = await axios.get(`${API_URL}/search`, {
            params: { keyword: "아" },
          });

          if (searchResponse.data.allGenres) {
            const genres = searchResponse.data.allGenres.map((genre) => ({
              label: genre,
              value: `genre_${genre}`,
            }));
            setGenreItems(genres);
          }

          if (searchResponse.data.allCategories) {
            const categories = searchResponse.data.allCategories.map(
              (category) => ({
                label: category,
                value: `category_${category}`,
              })
            );
            setCategoryItems(categories);
          }
        } catch (searchErr) {
          console.error("대체 요청도 실패:", searchErr);
          setGenreItems([
            { label: "SF", value: "genre_SF" },
            { label: "공포(호러)", value: "genre_공포(호러)" },
            { label: "다큐멘터리", value: "genre_다큐멘터리" },
            { label: "드라마", value: "genre_드라마" },
            { label: "로맨스", value: "genre_로맨스" },
            { label: "리얼리티", value: "genre_리얼리티" },
            { label: "무협", value: "genre_무협" },
            { label: "뮤지컬", value: "genre_뮤지컬" },
            { label: "미스터리", value: "genre_미스터리" },
            { label: "버라이어티", value: "genre_버라이어티" },
            { label: "범죄", value: "genre_범죄" },
            { label: "서바이벌", value: "genre_서바이벌" },
            { label: "성인", value: "genre_성인" },
            { label: "스릴러", value: "genre_스릴러" },
            { label: "시대물", value: "genre_시대물" },
            { label: "애니메이션", value: "genre_애니메이션" },
            { label: "액션", value: "genre_액션" },
            { label: "어드벤처", value: "genre_어드벤처" },
            { label: "코미디", value: "genre_코미디" },
            { label: "키즈", value: "genre_키즈" },
            { label: "토크쇼", value: "genre_토크쇼" },
            { label: "판타지", value: "genre_판타지" },
          ]);

          setCategoryItems([
            { label: "영화", value: "category_영화" },
            { label: "드라마", value: "category_드라마" },
            { label: "애니메이션", value: "category_애니메이션" },
            { label: "영화, 애니메이션", value: "category_영화, 애니메이션" },
            { label: "예능", value: "category_예능" },
            { label: "예능, 공연", value: "category_예능, 공연" },
          ]);
        }
      }
    };

    fetchInitialFilters();
  }, [API_URL]);

  const handleOttSelect = (ottName) => {
    setSelectedOtts((prev) => {
      const isSelected = prev.includes(ottName);

      if (prev.length === allOttNames.length) {
        // 전체 선택 상태에서 클릭하면 해당 하나만 남김
        return [ottName];
      } else {
        const updated = isSelected
          ? prev.filter((o) => o !== ottName)
          : [...prev, ottName];

        // 아무것도 선택되지 않으면 다시 전체 선택
        return updated.length === 0 ? [...allOttNames] : updated;
      }
    });
  };

  const handleSortChange = (sortValue) => {
    setSort(sortValue);
  };

  useEffect(() => {
    console.log("페이지 변경됨:", page);
    if (page > 0) {
      fetchMoreResults();
    }
  }, [page]);

  const resetSearch = () => {
    setPage(0);
    setHasMore(true);
    setSearchResults([]);
  };

  const fetchSearchResults = async () => {
    if (
      !searchQuery.trim() &&
      selectedFilters.length === 0 &&
      selectedOtts.length === 0
    ) {
      return;
    }

    resetSearch();
    await fetchMoreResults(0);
  };

  const fetchMoreResults = async (pageNum = page) => {
    try {
      setIsLoading(true);
      setError(null);

      const genres = selectedFilters
        .filter((filter) => filter.value.startsWith("genre_"))
        .map((filter) => filter.value.replace("genre_", ""));

      const categories = selectedFilters
        .filter((filter) => filter.value.startsWith("category_"))
        .map((filter) => filter.value.replace("category_", ""));

      // activeTab이 문자열인지 확인하고 처리
      const tabType =
        typeof activeTab === "object" && activeTab !== null
          ? activeTab.value
          : activeTab;

      const params = {
        keyword: searchQuery.trim() || null,
        genres: genres.length > 0 ? genres.join(",") : null,
        categories: categories.length > 0 ? categories.join(",") : null,
        otts:
          selectedOtts.length > 0
            ? selectedOtts.join(",")
            : ottList.map((ott) => ott.alt).join(","),
        sort: sort.toString(),
        page: pageNum,
        type: tabType,
      };

      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      console.log("검색 요청 파라미터:", params);

      // URL 생성하여 콘솔에 출력
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => searchParams.append(key, val));
        } else {
          searchParams.append(key, value);
        }
      });
      const fullUrl = `${API_URL}/search?${searchParams.toString()}`;
      console.log("완성된 요청 URL:", fullUrl);

      const response = await axios.get(`${API_URL}/search`, {
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((val) => searchParams.append(key, val));
            } else {
              searchParams.append(key, value);
            }
          });

          return searchParams.toString();
        },
      });

      console.log("검색 결과:", response.data);

      // 탭에 따라 다른 응답 구조 처리
      if (tabType === "content" && response.data.content) {
        if (pageNum === 0) {
          setSearchResults(response.data.content);
        } else {
          setSearchResults((prev) => [...prev, ...response.data.content]);
        }
        setHasMore(response.data.hasNext);
      } else if (tabType === "cast" && response.data.cast) {
        if (pageNum === 0) {
          setSearchResults(response.data.cast);
        } else {
          setSearchResults((prev) => [...prev, ...response.data.cast]);
        }
        setHasMore(response.data.hasNext);
      } else if (tabType === "crew" && response.data.crew) {
        if (pageNum === 0) {
          setSearchResults(response.data.crew);
        } else {
          setSearchResults((prev) => [...prev, ...response.data.crew]);
        }
        setHasMore(response.data.hasNext);
      } else {
        if (pageNum === 0) {
          setSearchResults([]);
        }
        setHasMore(false);
      }

      console.log("다음 페이지 존재 여부:", response.data.hasNext);
    } catch (err) {
      console.error("검색 중 오류가 발생했습니다:", err);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      if (pageNum === 0) {
        setSearchResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (genreItems.length > 0) {
      resetSearch();
      const timer = setTimeout(() => {
        fetchMoreResults(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedFilters, selectedOtts, sort, activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchQuery);
    fetchSearchResults();
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.some((f) => f.value === filter.value)) {
        return prevFilters.filter((f) => f.value !== filter.value);
      }
      return [...prevFilters, filter];
    });
  };

  const handleRemoveFilter = (filterValue) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.value !== filterValue)
    );
  };

  const FilterCheckBox = ({ item }) => {
    const isChecked = selectedFilters.some(
      (filter) => filter.value === item.value
    );

    const handleItemClick = () => {
      handleFilterChange(item);
    };

    return (
      <CheckBox
        checked={isChecked}
        onChange={handleItemClick}
        onClick={handleItemClick}
      >
        {item.label}
      </CheckBox>
    );
  };

  const handleScroll = useCallback(() => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      !isLoading &&
      hasMore &&
      windowHeight + scrollTop >= documentHeight - 10
    ) {
      console.log("스크롤 하단 감지, 다음 페이지 로드:", page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleTabClick = (value) => {
    console.log("탭 클릭:", value, typeof value); // 값과 타입 확인
    const tabValue =
      typeof value === "object" && value !== null ? value.value : value;
    setActiveTab(tabValue);
    resetSearch();
    if (
      searchText.trim() ||
      selectedFilters.length > 0 ||
      selectedOtts.length > 0
    ) {
      setSearchQuery(searchText);
      fetchMoreResults(0);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <SearchButton type="submit" disabled={isLoading}>
            {isLoading ? "검색 중..." : "검색"}
          </SearchButton>
        </SearchForm>
      </SearchHeader>

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

      <TabComponent list={tabList} onTabChange={handleTabClick} />

      {/* 작품 탭일 때만 필터 컴포넌트들 렌더링 */}
      {activeTab === "content" && (
        <>
          {selectedFilters.length > 0 && (
            <SelectedFiltersWrapper>
              <FilterLabel>선택한 필터</FilterLabel>
              <SelectedFiltersContainer>
                {selectedFilters.map((filter) => (
                  <FilterBoxWrapper key={filter.value}>
                    <FilterBox onClick={() => handleRemoveFilter(filter.value)}>
                      {filter.label} <CloseIcon>×</CloseIcon>
                    </FilterBox>
                  </FilterBoxWrapper>
                ))}
              </SelectedFiltersContainer>
            </SelectedFiltersWrapper>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

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
                <Dropdown list={frameworks} />
              </ControlsContainer>
            </FilterSection>
          </SearchContent>
        </>
      )}

      {/* 에러 메시지는 모든 탭에서 표시 */}
      {activeTab !== "content" && error && <ErrorMessage>{error}</ErrorMessage>}

      <ResultsSection isContentTab={activeTab === "content"}>
        {isLoading && page === 0 ? (
          <LoadingMessage>검색 결과를 불러오는 중...</LoadingMessage>
        ) : searchResults.length > 0 ? (
          <>
            {activeTab === "content" &&
              // 작품 탭일 때 PosterCard 렌더링
              searchResults.map((result, index) => (
                <PosterCardWrapper
                  key={`${result.contentId}-${index}`}
                  onClick={() => handleContentClick(result.contentId)}
                >
                  <PosterCard
                    src={result.poster}
                    title={result.title}
                    ottname={result.ottname || ""}
                  />
                </PosterCardWrapper>
              ))}

            {activeTab === "cast" && (
              // 배우 탭일 때 ProfileIcon 렌더링
              <ProfileGrid>
                {searchResults.map((person, index) => (
                  <ProfileIconWrapper
                    key={`${person.personId}-${index}`}
                    onClick={() => handlePersonClick(person.personId)}
                  >
                    <ProfileIcon
                      imagePath={
                        person.image ||
                        "https://via.placeholder.com/100x100?text=No+Image"
                      }
                      name={person.personName}
                    />
                  </ProfileIconWrapper>
                ))}
              </ProfileGrid>
            )}

            {activeTab === "crew" && (
              // 감독/작가 탭일 때 ProfileIcon 렌더링
              <ProfileGrid>
                {searchResults.map((person, index) => (
                  <ProfileIconWrapper
                    key={`${person.personId}-${index}`}
                    onClick={() => handlePersonClick(person.personId)}
                  >
                    <ProfileIcon
                      imagePath={
                        person.image ||
                        "https://via.placeholder.com/100x100?text=No+Image"
                      }
                      name={person.personName}
                    />
                  </ProfileIconWrapper>
                ))}
              </ProfileGrid>
            )}

            {isLoading && page > 0 && (
              <LoadingMoreMessage>
                더 많은 결과를 불러오는 중...
              </LoadingMoreMessage>
            )}
          </>
        ) : (
          <NoResults>
            {searchQuery.trim() || selectedFilters.length > 0
              ? "검색 결과가 없습니다."
              : "검색어 또는 필터를 선택해주세요."}
          </NoResults>
        )}
      </ResultsSection>
    </SearchContainer>
  );
};

export default SearchPage;
