import { useEffect, useRef, useState } from "react";

// 기존 컴포넌트들
import CastSlider from "../components/CastSlider";
import BannerImage from "../components/BannerImage";
import PosterCard from "../components/PosterCard";
import OttButton from "../components/OttButton";
import WatchButton from "../components/WatchButton";
import Review from "../components/Review";
import Text from "../components/Text";
import HeaderButton from "../components/HeaderButton";
import WatchBox from "../components/WatchBox";
import watchType from "../contents/watchType";
import { getContentById } from "../services/api/contentDetailService";
import { useParams } from "react-router-dom";
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
import { Dialog, Skeleton } from "@chakra-ui/react";
import ReviewModal from "../components/ReviewModal";
import useAuthStore from "../store/useAuthStore";
import { useReview, useReviewList } from "../hooks/useReview";

const ContentDetailPage = () => {
  // 데이터
  const [content, setContent] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [type, setType] = useState("");

  // 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상태변화
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isRefetch, setIsRefetch] = useState(false);

  // 파라미터
  const { contentId } = useParams();
  const { userId } = useAuthStore();
  const { VITE_API_URL } = import.meta.env;

  const {
    data: reviewData,
    isLoading: reviewLoading,
    error: reviewError,
  } = useReviewList(contentId, page);

  const observerRef = useRef(null); // observer를 위한 ref

  // 콘텐츠 불러오기
  const getContent = async () => {
    getContentById(contentId)
      .then((res) => {
        setContent(res.data);
        setType(watchType[res.data.type]);
      })
      .catch((err) => {
        setError(err);
        console.error("[컨텐츠 데이터 가져오기 실패] : ", err);
      })
      .finally(() => setLoading(false));
  };

  // 리뷰 데이터를 업데이트
  useEffect(() => {
    if (reviewData) {
      const newReviews = reviewData.data.content;

      if (page === 1) {
        console.log("dddd");

        setReviewList(newReviews);
      } else {
        setReviewList((prev) => [...prev, ...newReviews]);
      }

      setTotalPage(reviewData.data.totalPages);
    }
  }, [reviewData]);

  console.log(reviewList);

  // 콘텐츠 데이터를 처음 불러오기
  useEffect(() => {
    setLoading(true);
    setError(null);
    getContent();
  }, [contentId]);

  // 무한 스크롤 기능
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPage && !reviewLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, totalPage, reviewLoading, observerRef.current]);

  if (loading) {
    return <div>콘텐츠 정보를 로딩 중입니다...</div>;
  }

  if (error) {
    return <div>콘텐츠 정보를 가져오는데 실패했습니다: {error.message}</div>;
  }

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
                <a key={index} href={value.url} target="_blank">
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
                <ReviewModal contentId={contentId} />
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
          <Text
            text={"한줄평"}
            count={reviewList.length > 0 ? reviewList.length : "0"}
          />
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
      <div ref={observerRef} style={{ height: "10px" }} />
    </Container>
  );
};

export default ContentDetailPage;
