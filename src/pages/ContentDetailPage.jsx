import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// 컴포넌트들
import CastSlider from "../components/detail/CastSlider";
import BannerImage from "../components/common/BannerImage";
import PosterCard from "../components/common/PosterCard";
import OttButton from "../components/common/OttButton";
import WatchButton from "../components/detail/WatchButton";
import Review from "../components/review/Review";
import Text from "../components/common/Text";
import WatchBox from "../components/detail/WatchBox";
import ReviewModal from "../components/review/ReviewModal";

// 컨텐츠 및 스타일 관련
import ott from "../types/ottType";
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
} from "../styles/pages/ContentDetailPage";

// Auth 상태 관리
import useAuthStore from "../store/useAuthStore";
import { useContent } from "../hooks/useContent";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { useReview } from "../hooks/useReview";
import { toast } from "react-toastify";

const ContentDetailPage = () => {
  const { contentId } = useParams();
  const { userId, isLogin } = useAuthStore();

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
  const { reviewData, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useReview(contentId);

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
        ageRating={content.ageRating + "세 이상 관람가"}
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
              {isLogin ? (
                <ReviewModal contentId={contentId}>
                  <WatchButton />
                </ReviewModal>
              ) : (
                <WatchButton
                  onClick={() => toast.warn("로그인이 필요합니다.")}
                />
              )}
            </WatchGroup>
          </ContentDescription>
        </ContentDetail>

        <ContentCastAndCrew>
          <Text text={"출연자"} />
          {cast.length === 0 ? (
            <div style={{ height: "100px" }}></div>
          ) : (
            <CastSlider castList={cast} />
          )}
          <Text text={"제작진"} />
          {cast.length === 0 ? (
            <div style={{ height: "50px" }}></div>
          ) : (
            <CastSlider castList={crew} />
          )}
        </ContentCastAndCrew>

        <ReviewGroup>
          <Text
            text={"한줄평"}
            count={reviewData?.pages[0].data.totalCount ?? ""}
          />
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
