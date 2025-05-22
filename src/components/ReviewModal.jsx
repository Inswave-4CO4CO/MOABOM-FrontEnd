import { useState } from "react";
import {
  ReviewRating,
  ReviewTextarea,
} from "../styles/pages/ContentDetailPage";
import Modal from "./Modal";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useReview } from "../hooks/useReview";

const ReviewModal = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const { contentId } = useParams();

  const {
    userReview,
    createReviewMutate,
    modifyReviewMutate,
    deleteReviewMutate,
  } = useReview(contentId);

  // 핸들러
  const handleCreate = () => {
    if (!reviewText.trim()) {
      toast.error("한줄평을 입력하세요.");
      return;
    }
    createReviewMutate({ reviewText, rating });
  };

  const handleModify = () => {
    if (!reviewText.trim()) {
      toast.error("한줄평을 입력하세요.");
      return;
    }
    modifyReviewMutate({
      reviewId: userReview.reviewId,
      reviewText,
      rating,
    });
  };

  const handleDelete = () => {
    if (!userReview?.reviewId) {
      toast.error("삭제할 리뷰를 찾을 수 없습니다.");
      return;
    }
    deleteReviewMutate(userReview.reviewId);
  };

  return (
    <Modal
      title="나의 한줄평"
      actions={
        userReview && userReview.reviewText
          ? [
              { text: "수정", onClick: handleModify },
              { text: "삭제", onClick: handleDelete },
            ]
          : [{ text: "추가", onClick: handleCreate }]
      }
    >
      <ReviewTextarea
        placeholder="한줄평을 입력하세요"
        value={userReview?.reviewText || reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <ReviewRating>
        <span>평점: &nbsp;</span>
        <ReactStars
          count={5}
          value={userReview?.rating || rating}
          onChange={setRating}
          size={24}
          color2={"#ffa07a"}
        />
      </ReviewRating>
    </Modal>
  );
};

export default ReviewModal;
