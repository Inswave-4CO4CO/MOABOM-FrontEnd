import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// 컴포넌트들
import CastSlider from "../components/CastSlider";
import BannerImage from "../components/BannerImage";
import PosterCard from "../components/PosterCard";
import OttButton from "../components/OttButton";
import WatchButton from "../components/WatchButton";
import Review from "../components/Review";
import Text from "../components/Text";
import WatchBox from "../components/WatchBox";
import ReviewModal from "../components/ReviewModal";

// 컨텐츠 및 스타일 관련
import ott from "../contents/ottType";
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

// Auth 상태 관리
import useAuthStore from "../store/useAuthStore";
import { useContent } from "../hooks/useContent";
import { useInfiniteReviewList } from "../hooks/useReview";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { green } from "@mui/material/colors";

const ContentDetailPage = () => {
  const { contentId } = useParams();
  const { userId } = useAuthStore();

  //컨텐츠 가져오기
  const {
    content,
    type,
    genre,
    cast,
    crew,
    ott: ottList,
    loading,
    error,
  } = useContent(contentId);

  //한줄평
  const {
    data: reviewData,
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

  const observer = useRef(null);

  //무한 스크롤
  const setObserverRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      if (node) {
        observer.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        });

        observer.current.observe(node);
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    console.log(genre);
  }, [genre]);

  //로딩 스켈레톤
  if (loading) {
    return (
      <Container>
        <Skeleton height={400} />
        <ContentGroup>
          <ContentDetail>
            <Skeleton height={350} width={250} />
            <ContentDescription style={{ display: "flex" }}>
              <SkeletonText />
              <Skeleton count={4} />
              <OttGroup>
                <Skeleton
                  height={20}
                  width={300}
                  inline
                  style={{ marginRight: 10 }}
                  count={4}
                />
              </OttGroup>
              <WatchGroup>
                <Skeleton height={45} width={300} />
              </WatchGroup>
            </ContentDescription>
          </ContentDetail>

          <ContentCastAndCrew>
            <p>출연자</p>
            <Skeleton height={100} />
            <p>제작진</p>
            <Skeleton height={100} />
          </ContentCastAndCrew>

          <ReviewGroup>
            <p>한줄평</p>
            <Reviews>
              {[...Array(4)].map((_, idx) => (
                <Skeleton height={280} width={280} key={idx} />
              ))}
            </Reviews>
          </ReviewGroup>
        </ContentGroup>
      </Container>
    );
  }
  //에러
  if (error)
    return <div>콘텐츠 정보를 가져오는데 실패했습니다: {error.message}</div>;

  return (
    <Container>
      <BannerImage
        rating={content.rating}
        src={content.image}
        title={content.title}
        genre={genre.map((genre) => genre.genreName).join(", ")}
        category={content.category}
        madeIn={content.madeIn}
        ageRating={content.ageRating}
        runningTime={content.runningTime}
        releaseDate={content.releaseDate}
        imdbRating={content.imdbRating}
        isDetail={true}
      />
      <ContentGroup>
        <ContentDetail>
          <PosterCard src={content.poster} />
          <ContentDescription>
            <p>줄거리</p>
            <span>{content.description}</span>
            <p>보러가기</p>
            <OttGroup>
              {ottList.map((value, index) => (
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
              <WatchBox type={type} contentId={contentId} genre={genre} />
              <ReviewModal contentId={contentId}>
                <WatchButton />
              </ReviewModal>
            </WatchGroup>
          </ContentDescription>
        </ContentDetail>

        <ContentCastAndCrew>
          <Text text={"출연자"} />
          <CastSlider castList={cast} />
          <Text text={"제작진"} />
          <CastSlider castList={crew} />
        </ContentCastAndCrew>

        <ReviewGroup>
          <Text text={"한줄평"} count={reviewList.length} />
          <Reviews>
            {reviewList.map((value) => (
              <Review
                key={value.reviewId}
                reviewId={value.reviewId}
                rating={value.rating}
                contentId={value.contentId}
                date={value.createdAt}
                text={value.reviewText}
                nickname={value.nickName}
                imagePath={value.userImage}
                isUser={value.userId === userId}
              />
            ))}
          </Reviews>
        </ReviewGroup>
      </ContentGroup>
      <div
        ref={setObserverRef}
        style={{ height: "20px", background: "transparent" }}
      />
    </Container>
  );
};

export default ContentDetailPage;
