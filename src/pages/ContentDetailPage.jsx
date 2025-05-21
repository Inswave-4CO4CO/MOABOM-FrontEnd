import React, { useEffect, useState } from "react";

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
import Modal from "../components/Modal";
import watchType from "../contents/watchType";
import {
  getContentById,
  getReviewByPage,
} from "../services/contentDetailService";
import { useParams } from "react-router-dom";
import ott from "../contents/ottType";
import {
  createReview,
  deleteReview,
  findByContentIdAndUserId,
  modifyReview,
} from "../services/reviewService";
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
  ReviewTextarea,
  ReviewRating,
  AddButton,
} from "../styles/pages/ContentDetailPage";
import ReactStars from "react-stars";

const ContentDetailPage = () => {
  //데이터
  const [content, setContent] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [type, setType] = useState("");

  //에러
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //상태변화
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  //파라미터
  const { contentId } = useParams();

  //유저 아이디
  let userId =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb3NhIiwiaWF0IjoxNzQ3NjM1NzY4LCJleHAiOjE3NDg4NDUzNjh9.rVhHFb5VbF3mBUGe59Ft3Y1dgYiWwNgqA_pMqmybA9w";

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

  //한줄평 가져오기
  const findUserReview = async () => {
    findByContentIdAndUserId(contentId)
      .then((res) => {
        setUserReview(res.data);
        setReviewText(res.data.reviewText);
        setRating(res.data.rating);
      })
      .catch((err) => console.error("[나의 한줄평 가져오기 실패] : ", err));
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

  // 한줄평 추가
  const handleCreate = async () => {
    try {
      const response = await createReview(reviewText, null, rating, contentId);
      setUserReview(response.data);

      const updatedList = [
        response.data,
        ...reviewList.filter((r) => r.reviewId !== response.data.reviewId),
      ];

      let finalList = [...updatedList];

      const requiredCount = (page + 1) * 8;

      while (finalList.length < requiredCount) {
        const res = await getReviewByPage(contentId, page + 1);
        const newReviews = res.data.filter(
          (r) => !finalList.some((item) => item.reviewId === r.reviewId)
        );

        if (newReviews.length === 0) break;

        finalList = [...finalList, ...newReviews];
        setPage((prev) => prev + 1);
      }

      setReviewList(finalList.slice(0, requiredCount));
      alert("한줄평이 추가되었습니다.");
    } catch (err) {
      console.error("[한줄평 추가 실패] : ", err);
    }
  };

  // 한줄평 수정
  const handleModify = async () => {
    try {
      const response = await modifyReview(
        userReview.reviewId,
        reviewText,
        userReview.createdAt,
        rating,
        contentId
      );
      setUserReview(response.data);

      setReviewList((prev) => {
        if (prev.some((item) => item.reviewId === response.data.reviewId)) {
          return prev.map((item) =>
            item.reviewId === response.data.reviewId ? response.data : item
          );
        } else {
          return prev;
        }
      });

      alert("한줄평이 수정되었습니다.");
    } catch (err) {
      console.error("[한줄평 수정 실패] : ", err);
    }
  };

  // 한줄평 삭제
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteReview(userReview.reviewId);

        let newList = reviewList.filter(
          (item) => item.reviewId !== userReview.reviewId
        );
        setUserReview("");
        setReviewText("");
        setRating(0);

        const requiredCount = (page + 1) * 8;
        while (newList.length < requiredCount) {
          const res = await getReviewByPage(contentId, page + 1);
          const additional = res.data.filter(
            (r) => !newList.some((item) => item.reviewId === r.reviewId)
          );
          if (additional.length === 0) break;

          newList = [...newList, ...additional];
          setPage((prev) => prev + 1);
        }

        setReviewList(newList.slice(0, requiredCount));
        alert("한줄평이 삭제되었습니다.");
      } catch (err) {
        console.error("[한줄평 삭제 실패] : ", err);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    getContent();
    getReviewList();
    findUserReview();
  }, []);

  useEffect(() => {
    console.log(userReview);
  }, [userReview]);

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
              <WatchBox type={type} userId={userId} contentId={contentId} />
              <Modal
                modalButton={<WatchButton />}
                title="나의 한줄평"
                text={
                  <>
                    <ReviewTextarea
                      placeholder="한줄평을 입력하세요"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                    <ReviewRating>
                      <span>평점: &nbsp;</span>
                      <ReactStars
                        count={5}
                        value={rating}
                        onChange={setRating}
                        size={24}
                        color2={"#ffa07a"}
                      />
                    </ReviewRating>
                  </>
                }
                actions={
                  userReview && userReview.reviewText
                    ? [
                        { text: "수정", onClick: handleModify },
                        { text: "삭제", onClick: handleDelete },
                      ]
                    : [{ text: "추가", onClick: handleCreate }]
                }
              />
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
                rating={value.rating}
                date={value.createdAt}
                text={value.reviewText}
                nickname={value.userId}
                isUser={value.reviewId === userReview.reviewId ? true : false}
                handleModify={handleModify}
                handleDelete={handleDelete}
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
