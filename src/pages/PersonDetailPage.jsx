import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Profile from "../components/common/Profile";
import ContentBox from "../components/common/ContentBox";
import { ottList } from "../components/common/OttButtonList";
import { DOMAIN } from "../services/domain";
import { SearchContainer } from "../styles/pages/SearchPage";
import {
  LeftGroupContainer,
  PageContainer,
  RightGroupContainer,
} from "../styles/pages/ProfileEditPage";
import { baseInstance } from "../services/axiosInstance";

const allOttNames = ottList.map((ott) => ott.alt);

const PersonDetailPage = () => {
  const { personId } = useParams();
  const [activeTab, setActiveTab] = useState("actor");
  const [selectedOtts, setSelectedOtts] = useState(allOttNames);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  // 한 번만 연결 플래그
  const observerAttached = useRef(false);

  // 1. 프로필 정보를 위한 별도 상태
  const [profileInfo, setProfileInfo] = useState({
    personName: null,
    image: null,
    initialActorCount: null, // 초기 출연작 수
    initialDirectorCount: null, // 초기 연출작 수
  });

  // 데이터를 페이지 단위로 가져오는 함수
  const fetchPersonData = async ({ pageParam = 0 }) => {
    const { data } = await baseInstance.get(DOMAIN.PERSON_DETAIL(personId), {
      params: { otts: selectedOtts.join(","), page: pageParam },
      withCredentials: true,
    });
    // API 응답 데이터 콘솔 출력 (디버깅용)
    // console.log(`[PersonDetailPage] API Response for page ${pageParam}, tab ${activeTab}:`, data);
    const currentTabData = data.filmography?.[activeTab] || [];
    return {
      response: data,
      nextPage: currentTabData.length > 0 ? pageParam + 1 : undefined,
      currentPage: pageParam,
    };
  };

  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["personDetail", personId, activeTab, selectedOtts],
    queryFn: fetchPersonData,
    getNextPageParam: (last) => last.nextPage,
    initialPageParam: 0,
  });

  // 2. 첫 페이지 데이터 로드 시 프로필 정보 설정하는 useEffect
  useEffect(() => {
    const firstPageData = pages?.pages?.[0]?.response;
    if (firstPageData && !profileInfo.personName) {
      // 프로필 정보가 아직 설정되지 않았을 때만
      setProfileInfo({
        personName: firstPageData.personName,
        image: firstPageData.image,
        initialActorCount: firstPageData.totalCounts?.actor,
        initialDirectorCount: firstPageData.totalCounts?.director,
      });
    }
  }, [pages, profileInfo.personName]); // profileInfo.personName을 의존성 배열에 추가하여 한 번만 실행되도록 유도

  // API에서 받아온 여러 페이지를 합쳐서 filmography 데이터만 생성
  const filmographyData = pages?.pages.reduce(
    (acc, page) => {
      acc.filmography = acc.filmography || {};
      const currentTabFilmography = acc.filmography[activeTab] || [];
      const newItemsFromPage = page.response.filmography?.[activeTab] || [];
      const uniqueNewItems = newItemsFromPage.filter(
        (newItem) =>
          !currentTabFilmography.some(
            (existingItem) => existingItem.contentId === newItem.contentId
          )
      );
      acc.filmography[activeTab] = currentTabFilmography.concat(uniqueNewItems);
      return acc;
    },
    { filmography: {} }
  );

  // IntersectionObserver 로 다음 페이지 요청
  useEffect(() => {
    if (
      isLoading ||
      !observerRef.current ||
      !hasNextPage ||
      isFetchingNextPage ||
      observerAttached.current
    )
      return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // 스크롤 컨테이너
        threshold: 0, // sentinel이 50% 보일 때만
        rootMargin: "0px 0px -30px 0px", // 바닥선 30px 위에 와야 트리거
      }
    );

    observer.observe(observerRef.current);
    observerAttached.current = true;
    return () => {
      observer.disconnect();
      observerAttached.current = false;
    };
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 탭 변경 핸들러
  const handleTabClick = (value) => {
    const tabValue =
      typeof value === "object" && value !== null ? value.value : value;
    setActiveTab(tabValue);
  };

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <SearchContainer>
      <PageContainer>
        <LeftGroupContainer>
          {/* 3. Profile 컴포넌트에 별도 상태 값 전달 */}
          <Profile
            isMyPage={false}
            image={profileInfo.image}
            name={profileInfo.personName}
            firstCount={profileInfo.initialActorCount}
            secondCount={profileInfo.initialDirectorCount}
            handleFirstAction={() => setActiveTab("actor")}
            handleSecondAction={() => setActiveTab("director")}
            loading={isLoading && !profileInfo.personName}
          />
        </LeftGroupContainer>
        <RightGroupContainer>
          <ContentBox
            selectedOtts={selectedOtts}
            setSelectedOtts={setSelectedOtts}
            tabs={[
              { label: "출연작", value: "actor" },
              { label: "연출작", value: "director" },
            ]}
            defaultTab={activeTab}
            onTabChange={handleTabClick}
            contentList={filmographyData?.filmography?.[activeTab] ?? []}
            scrollContainerRef={scrollContainerRef}
            observerRef={observerRef}
            isLoading={isLoading}
          />
          {hasNextPage && <div ref={observerRef} />}
        </RightGroupContainer>
      </PageContainer>
    </SearchContainer>
  );
};

export default PersonDetailPage;
