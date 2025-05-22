import { FaStar, FaPen, FaTrash } from "react-icons/fa";
import {
  DateSpan,
  DefaultImage,
  Image,
  LeftGroup,
  Line,
  NameAndDate,
  Rating,
  ReviewContainer,
  ReviewFooter,
  ReviewHeader,
  ReviewText,
  RightGroup,
  Icon,
} from "../styles/components/Review";
import { useState } from "react";
import Modal from "./Modal";
import ReactStars from "react-stars";
import { Input } from "@chakra-ui/react";
import { ReviewTextarea } from "../styles/pages/ContentDetailPage";

//리뷰
const Review = ({
  imagePath,
  nickname,
  date,
  text,
  rating,
  title,
  isUser,
  handleModify,
  handleDelete,
  reviewId,
}) => {
  const [reviewText, setReviewText] = useState(text || "");
  const [ratingNumber, setRatingNum] = useState(rating);

  return (
    <ReviewContainer>
      <ReviewHeader>
        <LeftGroup>
          {imagePath ? (
            <Image src={imagePath} alt="nickname" />
          ) : (
            <DefaultImage />
          )}
          <NameAndDate>
            <span>{nickname}</span>
            <DateSpan>{date}</DateSpan>
          </NameAndDate>
        </LeftGroup>
        <Rating>
          <FaStar size={35} color="#FF9266" />
          {rating ? (
            <span>
              {rating.toString().length === 1 ? rating + ".0" : rating}
            </span>
          ) : (
            "0.0"
          )}
        </Rating>
      </ReviewHeader>
      <Line />
      <ReviewText>{text}</ReviewText>
      <Line />
      {isUser ? (
        <ReviewFooter>
          {title ? <span>{title}</span> : <span />}
          <RightGroup>
            <Icon>
              <Modal
                modalButton={<FaPen size={25} />}
                title="나의 한줄평"
                text={
                  <>
                    <ReviewTextarea
                      placeholder="한줄평을 입력하세요"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      marginBottom="10px"
                    />
                    <ReactStars
                      count={5}
                      value={ratingNumber}
                      onChange={setRatingNum}
                      size={24}
                      color2={"#ffd700"}
                    />
                  </>
                }
                actions={[
                  {
                    text: "수정",
                    onClick: () =>
                      handleModify({
                        reviewId,
                        reviewText,
                        ratingNumber,
                      }),
                  },
                  { text: "삭제", onClick: () => handleDelete(reviewId) },
                ]}
              />
            </Icon>
            <Icon>
              <FaTrash
                size={25}
                onClick={() => {
                  handleDelete(reviewId);
                }}
              />
            </Icon>
          </RightGroup>
        </ReviewFooter>
      ) : (
        <ReviewFooter />
      )}
    </ReviewContainer>
  );
};

export default Review;
