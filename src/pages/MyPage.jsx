import { useEffect, useRef, useState } from "react";
import Chart from "../components/chart";
import Profile from "../components/Profile";
import ContentBox from "../components/ContentBox";
import { ottList } from "../components/OttButtonList";
import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { Container as ProfileContainer } from "../styles/components/Profile";

import { PageWrapper, Container } from "../styles/pages/MyPage";

import { useUserInfo } from "../hooks/useUserInfo";
import { useMyContents, useMyWatchCount } from "../hooks/useMyContents";
import { useMyReviewCount, useMyReviews } from "../hooks/useReview";
import {
  ChartWrapper,
  Header,
  Container as ChartContainer,
} from "../styles/components/Chart";
import {
  ContentBoxContainer,
  ContentBoxHeader,
  ContentBoxTitle,
  OttButtonContainer,
  ContentGrid,
  PosterItem,
  PosterContainer,
} from "../styles/components/ContentBox";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("watching"); //탭(보는중, 봤다)
  const [selectedOtts, setSelectedOtts] = useState(
    ottList.map((ott) => ott.alt)
  ); //ott 버튼
  const [isReviewView, setIsReviewView] = useState(false);

  const { myInfo } = useUserInfo(); //user 정보
  const { VITE_API_URL } = import.meta.env; //이미지 경로

  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  const { data: watchCount } = useMyWatchCount(); //보관함 개수
  const { data: reviewCount } = useMyReviewCount(); //한줄평 개수

  const {
    data: contentData,
    fetchNextPage: fetchNextContentPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isContentLoading,
  } = useMyContents(activeTab, selectedOtts); //나의 보관함(보는중, 봤다) 컨텐츠 목록

  const {
    data: reviewData,
    fetchNextPage: fetchNextReviewPage,
    hasNextPage: hasMoreReviews,
    isFetchingNextPage: isLoadingNextReview,
    isLoading: isReviewLoading,
    refetch: refetchReviewList,
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
    <PageWrapper>
      <Container>
        <div className="leftGroup">
          {myInfo ? (
            <Profile
              isMyPage
              firstCount={watchCount}
              secondCount={reviewCount}
              handleFirstAction={handleFirstClick}
              handleSecondAction={handleSecondClick}
              image={VITE_API_URL + myInfo?.userImage}
              name={myInfo?.nickName}
            />
          ) : (
            <ProfileContainer>
              <SkeletonCircle size="24" />
              <div className="name">
                <Skeleton height="6" width="60%" mx="auto" />
              </div>
              <div className="buttonBox">
                <Skeleton height="40px" width="100%" borderRadius="md" />
                <div className="subButtonBox">
                  <HStack spacing={4} mt="4" width="full">
                    <Skeleton height="40px" width="48%" borderRadius="md" />
                    <Skeleton height="40px" width="48%" borderRadius="md" />
                  </HStack>
                </div>
              </div>
            </ProfileContainer>
          )}
        </div>

        <div className="rightGroup">
          <Stack gap="10">
            {myInfo ? (
              <Chart />
            ) : (
              <ChartContainer>
                <Header>
                  <div className="title">
                    <Skeleton
                      height="35px"
                      width="100%"
                      style={{ display: "block" }}
                    />
                  </div>
                  <div className="select">
                    <Skeleton
                      height="35px"
                      width="100%"
                      style={{ display: "block" }}
                    />
                  </div>
                </Header>
                <ChartWrapper>
                  <Skeleton height="500px" width="100%" borderRadius="20px" />
                </ChartWrapper>
              </ChartContainer>
            )}

            {myInfo ? (
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
                name={myInfo?.nickName}
                isLoading={isReviewView ? isReviewLoading : isContentLoading}
              />
            ) : (
              <ContentBoxContainer>
                <ContentBoxHeader>
                  <ContentBoxTitle>
                    <Skeleton height="30px" width="30%" />
                  </ContentBoxTitle>

                  <OttButtonContainer>
                    <Skeleton height="40px" width="70%" />
                  </OttButtonContainer>

                  <Skeleton height="35px" width="60%" />
                </ContentBoxHeader>

                <ContentGrid>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <PosterItem key={index}>
                      <PosterContainer>
                        <Skeleton
                          height="300px"
                          width="100%"
                          borderRadius="10px"
                        />
                      </PosterContainer>
                    </PosterItem>
                  ))}
                </ContentGrid>
              </ContentBoxContainer>
            )}
          </Stack>
        </div>
      </Container>

      <div ref={observerRef} style={{ height: "1px" }} />
    </PageWrapper>
  );
};

export default MyPage;
