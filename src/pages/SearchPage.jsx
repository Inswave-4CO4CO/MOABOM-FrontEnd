import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import FilterBox from '../components/FilterBox';
import Dropdown from '../components/Dropdown';
import CheckBox from '../components/CheckBox';
import PosterCard from '../components/PosterCard';
import { createListCollection } from '@chakra-ui/react';
import OttButtonList, { ottList } from '../components/OttButtonList';
import axios from 'axios';
import TabComponent from '../components/Tab';
import { Footer } from '../components/Footer';
import { Text } from "@chakra-ui/react"

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedOtts, setSelectedOtts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreItems, setGenreItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [sort, setSort] = useState('popularity');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  
  const tabList = [
    {label:'작품', value:'content'},
    {label:'배우', value:'cast'},
    {label:'감독/작가', value:'crew'},
  ];
  const observer = useRef();
  const lastResultElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('마지막 요소 감지, 다음 페이지 로드: ', page + 1);
        setPage(prevPage => prevPage + 1);
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    if (node) {
      console.log('마지막 요소 관찰 설정:', node);
      observer.current.observe(node);
    }
  }, [isLoading, hasMore, page]);

  const API_URL = import.meta.env.VITE_API_URL;

  const frameworks = createListCollection({
    items: [
      { label: "인기순", value: "popularity" },
      { label: "최신순", value: "latest" },
      { label: "과거순", value: "oldest" },
    ],
  })

  useEffect(() => {
    const fetchInitialFilters = async () => {
      try {
        const response = await axios.get(`${API_URL}/search/filters`);
        console.log('필터 데이터 로드:', response.data);
        
        if (response.data.allGenres && response.data.allGenres.length > 0) {
          const genres = response.data.allGenres.map(genre => ({
            label: genre,
            value: `genre_${genre}`
          }));
          setGenreItems(genres);
        }
        
        if (response.data.allCategories && response.data.allCategories.length > 0) {
          const categories = response.data.allCategories.map(category => ({
            label: category,
            value: `category_${category}`
          }));
          setCategoryItems(categories);
        }
        
      } catch (err) {
        console.error('필터 데이터 로드 오류:', err);
        
        try {
          const searchResponse = await axios.get(`${API_URL}/search`, { 
            params: { keyword: '아' }
          });
          
          if (searchResponse.data.allGenres) {
            const genres = searchResponse.data.allGenres.map(genre => ({
              label: genre,
              value: `genre_${genre}`
            }));
            setGenreItems(genres);
          }
          
          if (searchResponse.data.allCategories) {
            const categories = searchResponse.data.allCategories.map(category => ({
              label: category,
              value: `category_${category}`
            }));
            setCategoryItems(categories);
          }
        } catch (searchErr) {
          console.error('대체 요청도 실패:', searchErr);
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
            { label: "판타지", value: "genre_판타지" }
          ]);
          
          setCategoryItems([
            { label: "영화", value: "category_영화" },
            { label: "드라마", value: "category_드라마" },
            { label: "애니메이션", value: "category_애니메이션" },
            { label: "영화, 애니메이션", value: "category_영화, 애니메이션" },
            { label: "예능", value: "category_예능" },
            { label: "예능, 공연", value: "category_예능, 공연" }
          ]);
        }
      }
    };
    
    fetchInitialFilters();
  }, [API_URL]);
  
  useEffect(() => {
    const allOtts = ottList.map(ott => ott.alt);
    setSelectedOtts(allOtts);
  }, []);
  
  const handleOttSelect = (ott) => {
    setSelectedOtts(prev => {
      if (prev.includes(ott)) {
        return prev.filter(item => item !== ott);
      }
      return [...prev, ott];
    });
  };
  
  const handleSortChange = (sortValue) => {
    setSort(sortValue);
  };
  
  useEffect(() => {
    console.log('페이지 변경됨:', page);
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
    if (!searchQuery.trim() && selectedFilters.length === 0 && selectedOtts.length === 0) {
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
        .filter(filter => filter.value.startsWith('genre_'))
        .map(filter => filter.value.replace('genre_', ''));
      
      const categories = selectedFilters
        .filter(filter => filter.value.startsWith('category_'))
        .map(filter => filter.value.replace('category_', ''));
      
      const params = {
        keyword: searchQuery.trim() || null,
        genres: genres.length > 0 ? genres.join(',') : null,
        categories: categories.length > 0 ? categories.join(',') : null,
        otts: selectedOtts.length > 0 ? selectedOtts.join(',') : ottList.map(ott => ott.alt).join(','),
        sort: sort.toString(),
        page: pageNum,
      };
      
      Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });
      
      console.log('검색 요청 파라미터:', params);
      
      const response = await axios.get(`${API_URL}/search`, { 
        params,
        paramsSerializer: params => {
          const searchParams = new URLSearchParams();
          
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach(val => searchParams.append(key, val));
            } else {
              searchParams.append(key, value);
            }
          });
          
          return searchParams.toString();
        }
      });
      
      console.log('검색 결과:', response.data);
      
      if (response.data.content) {
        if (pageNum === 0) {
          setSearchResults(response.data.content);
        } else {
          setSearchResults(prev => [...prev, ...response.data.content]);
        }
        
        setHasMore(response.data.hasNext);
        console.log('다음 페이지 존재 여부:', response.data.hasNext);
      } else {
        if (pageNum === 0) {
          setSearchResults([]);
        }
        setHasMore(false);
      }
      
    } catch (err) {
      console.error('검색 중 오류가 발생했습니다:', err);
      setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
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
  }, [selectedFilters, selectedOtts, sort]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(searchQuery);
    fetchSearchResults();
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters(prevFilters => {
      if (prevFilters.some(f => f.value === filter.value)) {
        return prevFilters.filter(f => f.value !== filter.value);
      }
      return [...prevFilters, filter];
    });
  };

  const handleRemoveFilter = (filterValue) => {
    setSelectedFilters(prevFilters => 
      prevFilters.filter(filter => filter.value !== filterValue)
    );
  };

  const FilterCheckBox = ({ item }) => {
    const isChecked = selectedFilters.some(filter => filter.value === item.value);
    
    return (
      <CheckBox 
        checked={isChecked}
        onChange={() => handleFilterChange(item)}
        children={item.label}
      />
    );
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    // 현재 스크롤 위치
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 화면에 보이는 높이
    const windowHeight = window.innerHeight;
    // 전체 문서 높이
    const documentHeight = document.documentElement.scrollHeight;
    
    // 스크롤이 하단에서 150px 이내로 가까워졌는지 확인
    if (!isLoading && hasMore && (windowHeight + scrollTop >= documentHeight - 10)) {
      console.log('스크롤 하단 감지, 다음 페이지 로드:', page + 1);
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading, hasMore, page]);
  
  // 스크롤 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
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
            {isLoading ? '검색 중...' : '검색'}
          </SearchButton>
        </SearchForm>
      </SearchHeader>
      {searchText && (
        <Text 
          textAlign="center" 
          fontSize="30px" 
          fontWeight="bold" 
          mt={2} mb={2}
          marginTop={30}
          marginBottom={30}
        >
          "{searchText}" 검색 결과
        </Text>
      )}
      <TabComponent list={tabList}/>
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
            <OttButtonList onSelect={handleOttSelect} selectedOtts={selectedOtts} />
            <Dropdown 
              list={frameworks}
              onChange={handleSortChange}
              defaultValue={sort}
            />
          </ControlsContainer>
        </FilterSection>
        
      </SearchContent>
      <ResultsSection>
        {isLoading && page === 0 ? (
          <LoadingMessage>검색 결과를 불러오는 중...</LoadingMessage>
        ) : searchResults.length > 0 ? (
          <>
            {searchResults.map((result, index) => (
              <PosterCard 
                key={`${result.contentId}-${index}`}
                src={result.poster}
                title={result.title}
                rating={result.rating}
                {...result}
              />
            ))}
            {isLoading && page > 0 && (
              <LoadingMoreMessage>더 많은 결과를 불러오는 중...</LoadingMoreMessage>
            )}
          </>
        ) : (
          <NoResults>
            {searchQuery.trim() || selectedFilters.length > 0 ? 
              '검색 결과가 없습니다.' : '검색어 또는 필터를 선택해주세요.'}
          </NoResults>
        )}
      </ResultsSection>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchHeader = styled.div`
  margin-bottom: 24px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SelectedFiltersWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-right: 16px;
  white-space: nowrap;
`;

const SelectedFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterBoxWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

const CloseIcon = styled.span`
  margin-left: 4px;
  font-weight: bold;
`;

const SearchContent = styled.div`
  display: flex;
  gap: 24px;
`;

const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterContainer = styled.div`
  background-color: #fff8f0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
`;

const GenreGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  overflow-y: auto;
  max-height: 300px;
`;

const CategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const GenreOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  overflow-y: visible;
`;

const CategoryOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 1px;
  background-color: #c3c0c0;
  align-self: stretch;
`;

const ResultsSection = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-bottom: 16px;
  font-weight: 500;
`;

const LoadingMessage = styled.div`
  padding: 15px 0;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 16px;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const LoadingMoreMessage = styled(LoadingMessage)`
  grid-column: 1 / -1;
  padding: 20px 0;
`;

export default SearchPage;