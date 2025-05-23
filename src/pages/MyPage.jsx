import Chart from "../components/chart";
import Profile from "../components/Profile";
import ContentBox from "../components/ContentBox";
import { ottList } from "../components/OttButtonList";
import { useEffect, useRef, useState } from "react";
import {
  getMyReviewList,
  getMyWatchCount,
  getMyWatchedContents,
  getMyWatchingContents,
} from "../services/api/myPageService";
import { useInfiniteQuery } from "@tanstack/react-query";

import { PageWrapper, Container } from "../styles/pages/MyPage";

import { useUserInfo } from "../hooks/useUserInfo";
import { Stack } from "@chakra-ui/react";

const MyPage = () => {
  const [watchCount, setWatchCount] = useState(0); //보관함 개수
  const [reviewCount, setReviewCount] = useState(0); //한줄평 개수
  const [reviewPage, setReviewPage] = useState(0); //한줄평 페이지
  const [isRefetch, setIsRefetch] = useState(false);

  const [activeTab, setActiveTab] = useState("watching"); //활성화된 탭(보는중인지 봤다인지)
  const [selectedOtts, setSelectedOtts] = useState([
    ...ottList.map((ott) => ott.alt),
  ]); //선택된 OTT들

  const [isReviewView, setIsReviewView] = useState(false); // false: 보관함, true: 리뷰

  const handleFirstClick = () => {
    setIsReviewView(false);
    setActiveTab("watching");
  }; // 보관함 보기
  const handleSecondClick = () => {
    setIsReviewView(true);
    setActiveTab("myReview");
  }; // 리뷰 보기

  const { myInfo } = useUserInfo();
  const { VITE_API_URL } = import.meta.env;

  const scrollContainerRef = useRef(null); //ContentBox를 참조
  const observerRef = useRef(); //ContentBox 내부에 있는 하단 영역 참조

  //보관함 데이터 불러오는 함수
  const fetchContents = async ({ pageParam = 1 }) => {
    const res =
      activeTab === "watching"
        ? await getMyWatchingContents(pageParam, selectedOtts)
        : await getMyWatchedContents(pageParam, selectedOtts);

    const { totalPages, currentPage } = res.data;

    return {
      content: res.data.content,
      currentPage,
      totalPages,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };
  };

  //보관함 무한 스크롤 쿼리
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["myContent", activeTab, selectedOtts],
      queryFn: fetchContents,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: 1000 * 60 * 5,
    });

  //보관함 데이터
  const allContents = data?.pages.flatMap((page) => page.content) ?? [];

  //한줄평 데이터 불러오는 함수
  const fetchReviews = async ({ pageParam = 1 }) => {
    const res = await getMyReviewList(pageParam);
    const { content, currentPage, totalPages, totalCount } = res.data;

    return {
      content,
      currentPage,
      totalPages,
      totalCount,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
    };
  };

  //한줄평 무한 스크롤 쿼리
  const {
    data: reviewData,
    fetchNextPage: fetchNextReviewPage,
    hasNextPage: hasMoreReviews,
    isFetchingNextPage: isLoadingNextReview,
    refetch: refetchReviewList,
  } = useInfiniteQuery({
    queryKey: ["myReviewList"],
    queryFn: fetchReviews,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isReviewView,
    staleTime: 1000 * 60 * 5,
  });

  //한줄평 데이터
  const allReviews = reviewData?.pages.flatMap((page) => page.content) ?? [];

  useEffect(() => {
    const scrollRoot = scrollContainerRef.current;
    const target = observerRef.current;

    if (!scrollRoot || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isReviewView && hasMoreReviews && !isLoadingNextReview) {
            fetchNextReviewPage();
          } else if (!isReviewView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    isReviewView,
    hasMoreReviews,
    isLoadingNextReview,
    hasNextPage,
    isFetchingNextPage,
    scrollContainerRef.current,
  ]);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue.value);

    //스크롤 위치 초기화
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleReviewUpdated = () => {
    setReviewPage(0);
    setIsRefetch(true);
    refetchReviewList();
  };

  //나의 한줄평 가져오기
  const getReviewList = () => {
    getMyReviewList(reviewPage + 1).then((res) => {
      setReviewCount(res.data.totalCount);
    });
  };

  useEffect(() => {
    if (isReviewView && reviewData) {
      const totalCount = reviewData.pages?.[0]?.totalCount;

      if (typeof totalCount === "number") {
        console.log(totalCount);
        setReviewCount(totalCount);
      }
    }
  }, [reviewData, isReviewView]);

  useEffect(() => {
    //보관함 개수 (봤다 + 보는중)
    getMyWatchCount().then((res) => setWatchCount(res.data.count));

    //나의 한줄평 개수 가져오기
    getReviewList();
  }, []);

  return (
    <PageWrapper>
      <Container>
        <div className="leftGroup">
          <Profile
            isMyPage={true}
            firstCount={watchCount}
            secondCount={reviewCount}
            handleFirstAction={handleFirstClick}
            handleSecondAction={handleSecondClick}
            image={myInfo ? VITE_API_URL + myInfo?.userImage : ""}
            name={myInfo?.nickName}
          />
        </div>
        <div className="rightGroup">
          <Stack gap="10">
            <Chart />
            <ContentBox
              contentList={isReviewView ? allReviews : allContents}
              title={isReviewView ? "한줄평" : "보관함"}
              tabs={
                isReviewView
                  ? [{ label: "내가 작성한 리뷰", value: "myReview" }]
                  : [
                      { label: "보는 중인 작품", value: "watching" },
                      { label: "본 작품", value: "watched" },
                    ]
              }
              defaultTab={activeTab}
              onTabChange={handleTabChange}
              selectedOtts={selectedOtts}
              setSelectedOtts={setSelectedOtts}
              scrollContainerRef={scrollContainerRef}
              observerRef={observerRef}
              isReview={isReviewView}
              userReview={allReviews}
              onUpdate={handleReviewUpdated}
              image={myInfo?.userImage}
            />
          </Stack>
        </div>
      </Container>
      <div ref={observerRef} style={{ height: "1px" }} />
    </PageWrapper>
  );
};

export default MyPage;
