import { useEffect, useState } from "react";

import CastSlider from "../components/CastSlider";
// 컴포넌트
import BannerImage from "../components/BannerImage";
import PosterCard from "../components/PosterCard";
import OttButton from "../components/OttButton";
import WatchButton from "../components/WatchButton";
import Review from "../components/Review";
import Text from "../components/Text";
import HeaderButton from "../components/HeaderButton";

// OTT 이미지
import WatchBox from "../components/WatchBox";
import watchType from "../contents/watchType";
import {
  getContentById,
  getReviewByPage,
} from "../services/api/contentDetailService";
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

const ContentDetailPage = () => {
  //데이터
  const [content, setContent] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [type, setType] = useState("");

  //에러
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //상태변화
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  //파라미터
  const { contentId } = useParams();

  const { userId } = useAuthStore();

  //리뷰 리스트 가져오기
  const getReviewList = async () => {
    try {
      const currentPage = page;
      const res = await getReviewByPage(contentId, currentPage);

      setReviewList((prev) => {
        const newReviews = res.data.reviews.filter(
          (newItem) =>
            !prev.some((existing) => existing.reviewId === newItem.reviewId)
        );
        return [...prev, ...newReviews];
      });

      setPage(currentPage + 1);
      setTotalPage(res.data.totalPages);
    } catch (err) {
      console.error("[한줄평 가져오기 실패] : ", err);
    }
  };

  //컨텐츠 불러오기
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

  useEffect(() => {
    setLoading(true);
    setError(null);
    getContent();
    getReviewList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <OttButton imageSrc={ott[value.ottName]} />
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
                key={value?.reviewId}
                reviewId={value?.reviewId}
                contentId={value?.contentId}
                rating={value?.rating}
                date={value?.createdAt}
                text={value?.reviewText}
                nickname={value?.userId}
                isUser={value?.userId === userId ? true : false}
              />
            ))}
          </Reviews>
        </ReviewGroup>

        <AddButton>
          {totalPage > page ? (
            <HeaderButton onClick={getReviewList} size="lg">
              더보기
            </HeaderButton>
          ) : (
            <></>
          )}
        </AddButton>
      </ContentGroup>
    </Container>
  );
};

export default ContentDetailPage;
