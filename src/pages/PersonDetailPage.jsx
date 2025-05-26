import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Profile from "../components/Profile";
import ContentBox from "../components/ContentBox";
import { ottList } from "../components/OttButtonList";
import { DOMAIN } from "../services/domain";
import { SearchContainer } from "../styles/pages/SearchPage";
import {
  LeftGroupContainer,
  PageContainer,
  RigthGroupContainer,
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
  const [initialCounts, setInitialCounts] = useState({
    actor: null,
    director: null,
  });

  // 데이터를 페이지 단위로 가져오는 함수
  const fetchPersonData = async ({ pageParam = 0 }) => {
    const { data } = await baseInstance.get(DOMAIN.PERSON_DETAIL(personId), {
      params: { otts: selectedOtts.join(","), page: pageParam },
      withCredentials: true,
    });

    const currentTabData = data.filmography?.[activeTab] || [];
    return {
      response: data,
      nextPage: currentTabData.length > 0 ? pageParam + 1 : undefined,
      currentPage: pageParam,
    };
  };

  // React Query 무한 스크롤 설정
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

  // API에서 받아온 여러 페이지를 합쳐서 렌더용 데이터로 변환
  const personDetails = pages?.pages.reduce(
    (acc, page) => {
      if (!acc.personName) {
        acc.personName = page.response.personName;
        acc.image = page.response.image;
        acc.totalCounts = page.response.totalCounts;
      }
      acc.filmography = acc.filmography || {};
      const arr = page.response.filmography?.[activeTab] || [];
      acc.filmography[activeTab] = (acc.filmography[activeTab] || []).concat(
        arr
      );
      return acc;
    },
    { filmography: { [activeTab]: [] } }
  );

  useEffect(() => {
    const firstPage = pages?.pages?.[0]?.response;
    // actor가 null일 때(아직 한 번도 설정되지 않았을 때)만 set
    if (firstPage?.totalCounts && initialCounts.actor === null) {
      setInitialCounts(firstPage.totalCounts);
    }
  }, [pages, initialCounts.actor]);

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <SearchContainer>
      <PageContainer>
        <LeftGroupContainer>
          <Profile
            isMyPage={false}
            image={personDetails?.image}
            name={personDetails?.personName}
            firstCount={initialCounts?.actor}
            secondCount={initialCounts?.director}
            onFirstClick={() => {
              setActiveTab("actor");
            }}
            onSecondClick={() => {
              setActiveTab("director");
            }}
            loading={isLoading}
          />
        </LeftGroupContainer>
        <RigthGroupContainer>
          <ContentBox
            selectedOtts={selectedOtts}
            setSelectedOtts={setSelectedOtts}
            tabs={[
              { label: "출연작", value: "actor" },
              { label: "연출작", value: "director" },
            ]}
            defaultTab={activeTab}
            onTabChange={handleTabClick}
            contentList={personDetails?.filmography?.[activeTab] ?? []}
            scrollContainerRef={scrollContainerRef}
            observerRef={observerRef}
            isLoading={isLoading}
          />
          {hasNextPage && <div ref={observerRef} />}
        </RigthGroupContainer>
      </PageContainer>
    </SearchContainer>
  );
};

export default PersonDetailPage;
