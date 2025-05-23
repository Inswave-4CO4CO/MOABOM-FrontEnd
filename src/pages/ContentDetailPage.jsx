import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// 컴포넌트들
import CastSlider from "../components/CastSlider";
import BannerImage from "../components/BannerImage";
import PosterCard from "../components/PosterCard";
import OttButton from "../components/OttButton";
import WatchButton from "../components/WatchButton";
import Review from "../components/Review";
import Text from "../components/Text";
import HeaderButton from "../components/HeaderButton";
import WatchBox from "../components/WatchBox";
import ReviewModal from "../components/ReviewModal";

// 컨텐츠 및 스타일 관련
import watchType from "../contents/watchType";
import ott from "../contents/ottType";
import { getContentById } from "../services/api/contentDetailService";
import {
  Container,
  ContentGroup,
  ContentDetail,
  ContentDescription,
  OttGroup,
  WatchGroup,
  ContentCastAndCrew,
  ReviewGroup,
  Reviews,
  AddButton,
} from "../styles/pages/ContentDetailPage";

// Chakra UI 다이얼로그
import { Dialog } from "@chakra-ui/react";

// Auth 상태 관리
import useAuthStore from "../store/useAuthStore";

// 무한 스크롤 리뷰 데이터를 가져오는 커스텀 훅
import { useInfiniteReviewList } from "../hooks/useReview";

const ContentDetailPage = () => {
  // 콘텐츠 데이터 관리
  const [content, setContent] = useState(null);
  const [type, setType] = useState("");

  // 로딩 및 에러 상태 (콘텐츠 관련)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { contentId } = useParams();
  const { userId } = useAuthStore();
  const { VITE_API_URL } = import.meta.env;

  const getContent = async () => {
    try {
      const res = await getContentById(contentId);
      setContent(res.data);
      setType(watchType[res.data.type]);
    } catch (err) {
      setError(err);
      console.error("[컨텐츠 데이터 가져오기 실패]:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getContent();
  }, [contentId]);

  // 무한 스크롤 Infinite Query
  const {
    data: reviewData,
    isLoading: reviewLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error: reviewError,
  } = useInfiniteReviewList(contentId);

  useEffect(() => {
    if (reviewError) {
      console.error("리뷰 데이터 오류:", reviewError);
    }
  }, [reviewError]);

  const reviewList = reviewData
    ? reviewData.pages.flatMap((page) => page.data?.content || [])
    : [];

  const observerRef = useRef(null);

  useLayoutEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log("Observer entries:", entries);
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0, rootMargin: "100px" }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, observerRef.current]);

  if (loading) return <div>콘텐츠 정보를 로딩 중입니다...</div>;
  if (error)
    return <div>콘텐츠 정보를 가져오는데 실패했습니다: {error.message}</div>;

  return (
    <Container>
      <BannerImage
        rating={content.content.rating}
        src={content.content.image}
        title={content.content.title}
        genre={content.genre.join(", ")}
        category={content.content.category}
        madeIn={content.content.madeIn}
        ageRating={content.content.ageRating}
        runningTime={content.content.runningTime}
        releaseDate={content.content.releaseDate}
        imdbRating={content.content.imdbRating}
        isDetail={true}
      />
      <ContentGroup>
        <ContentDetail>
          <PosterCard src={content.content.poster} />
          <ContentDescription>
            <p>줄거리</p>
            <span>{content.content.description}</span>
            <p>보러가기</p>
            <OttGroup>
              {content.ott.map((value, index) => (
                <a
                  key={index}
                  href={value.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <OttButton imageSrc={ott[value.ottName]} isSelected={true} />
                </a>
              ))}
            </OttGroup>
            <WatchGroup>
              <WatchBox type={type} contentId={contentId} />
              <Dialog.Root key={"center"} placement={"center"}>
                <Dialog.Trigger asChild>
                  <WatchButton />
                </Dialog.Trigger>
                <ReviewModal />
              </Dialog.Root>
            </WatchGroup>
          </ContentDescription>
        </ContentDetail>

        <ContentCastAndCrew>
          <Text text={"출연자"} />
          <CastSlider castList={content.cast} />
          <Text text={"제작진"} />
          <CastSlider castList={content.crew} />
        </ContentCastAndCrew>

        <ReviewGroup>
          <Text text={"한줄평"} count={reviewList.length} />
          <Reviews>
            {reviewList.map((value) => (
              <Review
                key={value.reviewId}
                reviewId={value.reviewId}
                rating={value.rating}
                date={value.createdAt}
                text={value.reviewText}
                nickname={value.nickName}
                imagePath={VITE_API_URL + value.userImage}
                isUser={value.userId === userId}
              />
            ))}
          </Reviews>
        </ReviewGroup>
      </ContentGroup>
      <div
        ref={observerRef}
        style={{ height: "20px", background: "transparent" }}
      />
    </Container>
  );
};

export default ContentDetailPage;
