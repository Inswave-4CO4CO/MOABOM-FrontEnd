import { useEffect, useRef, useState } from "react";
import Chart from "../components/mypage/Chart";
import Profile from "../components/common/ProfileCard";
import ContentBox from "../components/common/ContentBox";
import { ottList } from "../components/common/OttButtonList";
import { Stack } from "@chakra-ui/react";

import { useUserInfo } from "../hooks/useUserInfo";
import { useMyContents } from "../hooks/useMyContents";
import { SearchContainer } from "../styles/pages/SearchPage";
import {
  LeftGroupContainer,
  PageContainer,
  RigthGroupContainer,
} from "../styles/pages/ProfileEditPage";
import { useMyReviews } from "../hooks/useMyReviews";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("watching"); //탭(보는중, 봤다)
  const [selectedOtts, setSelectedOtts] = useState(
    ottList.map((ott) => ott.alt)
  ); //ott 버튼
  const [isReviewView, setIsReviewView] = useState(false);

  const { myInfo, isMyInfoLoading } = useUserInfo(); //user 정보

  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  const {
    watchCount,
    contentData,
    fetchNextContentPage,
    hasNextPage,
    isFetchingNextPage,
    isContentLoading,
  } = useMyContents(activeTab, selectedOtts); //나의 보관함(보는중, 봤다) 컨텐츠 목록

  const {
    reviewCount,
    reviewData,
    fetchNextReviewPage,
    hasMoreReviews,
    isLoadingNextReview,
    isReviewLoading,
    refetchReviewList,
  } = useMyReviews(isReviewView); //한줄평 목록

  const allContents = contentData?.pages.flatMap((page) => page.content) ?? [];
  const allReviews = reviewData?.pages.flatMap((page) => page.content) ?? [];

  //무한 스크롤
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isReviewView && hasMoreReviews && !isLoadingNextReview) {
            fetchNextReviewPage();
          } else if (!isReviewView && hasNextPage && !isFetchingNextPage) {
            fetchNextContentPage();
          }
        }
      },
      { root: null, threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReviewView,
    hasMoreReviews,
    isLoadingNextReview,
    hasNextPage,
    isFetchingNextPage,
  ]);

  //탭 전환 핸들러
  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue.value);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  //보관함 눌렀을 때 핸들러
  const handleFirstClick = () => {
    setIsReviewView(false);
    setActiveTab("watching");
  };

  //한줄평 눌렀을 때 핸들러
  const handleSecondClick = () => {
    setIsReviewView(true);
    setActiveTab("myReview");
  };

  //한줄평 수정/삭제시에 핸들러
  const handleReviewUpdated = () => {
    refetchReviewList();
  };

  return (
    <SearchContainer>
      <PageContainer>
        <LeftGroupContainer>
          <Profile
            isMyPage={true}
            firstCount={watchCount}
            secondCount={reviewCount}
            handleFirstAction={handleFirstClick}
            handleSecondAction={handleSecondClick}
            image={myInfo ? myInfo?.userImage : ""}
            name={myInfo?.nickName}
            isLoading={isMyInfoLoading}
          />
        </LeftGroupContainer>
        <RigthGroupContainer>
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
              image={myInfo ? myInfo?.userImage : ""}
              isLoading={isContentLoading || isReviewLoading}
            />
          </Stack>
        </RigthGroupContainer>
      </PageContainer>
      <div ref={observerRef} style={{ height: "1px" }} />
    </SearchContainer>
  );
};

export default MyPage;
