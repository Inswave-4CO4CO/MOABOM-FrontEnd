import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Profile from "../components/Profile";
import ContentBox from "../components/ContentBox";
import { ottList } from "../components/OttButtonList";
import api from "../services/api";
import { DOMAIN } from "../services/domain";
import {
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { Container as ProfileContainer } from "../styles/components/Profile";
import {
  ContentBoxContainer,
  ContentBoxHeader,
  ContentBoxTitle,
  OttButtonContainer,
  ContentGrid,
  PosterItem,
} from "../styles/components/ContentBox";
import {
  ProfileWrapper,
  ContentWrapper,
  Container,
} from "../styles/pages/PersonDetailPage";
import { SearchContainer } from "../styles/pages/SearchPage";
import {
  LeftGroupContainer,
  PageContainer,
  RigthGroupContainer,
} from "../styles/pages/ProfileEditPage";

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
    const { data } = await api.get(DOMAIN.PERSON_DETAIL(personId), {
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

  // 1) 초기 로딩 중엔 스켈레톤 보여주기
  if (isLoading) {
    return (
      <SearchContainer>
        {/* 프로필 영역 */}
        <ProfileWrapper>
          <ProfileContainer>
            {/* 아바타 */}
            <SkeletonCircle size="24" />

            {/* 이름 */}
            <div className="name">
              <Skeleton height="6" width="60%" mx="auto" />
            </div>

            {/* 주요 버튼들 */}
            <div className="buttonBox">
              <Skeleton height="40px" width="40%" borderRadius="md" />
              <Skeleton height="40px" width="40%" borderRadius="md" />
            </div>
          </ProfileContainer>
        </ProfileWrapper>

        {/* 콘텐츠 박스 영역 */}
        <ContentWrapper>
          <ContentBoxContainer>
            <ContentBoxHeader>
              {/* 타이틀 */}
              <ContentBoxTitle>
                <Skeleton height="24px" width="40%" />
              </ContentBoxTitle>

              <OttButtonContainer>
                {Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    height="32px"
                    width="49%"
                    borderRadius="full"
                  />
                ))}
              </OttButtonContainer>
            </ContentBoxHeader>

            {/* 포스터 그리드 */}
            <ContentGrid>
              {Array.from({ length: 6 }).map((_, idx) => (
                <PosterItem key={idx}>
                  <Skeleton height="300px" borderRadius="md" />
                  <SkeletonText noOfLines={2} spacing="2" mt="2" />
                </PosterItem>
              ))}
            </ContentGrid>
          </ContentBoxContainer>
        </ContentWrapper>
      </SearchContainer>
    );
  }
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <SearchContainer>
      <PageContainer>
        <LeftGroupContainer>
          <Profile
            isMyPage={false}
            image={personDetails.image}
            name={personDetails.personName}
            firstCount={initialCounts.actor}
            secondCount={initialCounts.director}
            onFirstClick={() => {
              setActiveTab("actor");
            }}
            onSecondClick={() => {
              setActiveTab("director");
            }}
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
          />
          {hasNextPage && (
            <div ref={observerRef} style={{ width: "100%", height: "1px" }} />
          )}
        </RigthGroupContainer>
      </PageContainer>
    </SearchContainer>
  );
};

export default PersonDetailPage;
