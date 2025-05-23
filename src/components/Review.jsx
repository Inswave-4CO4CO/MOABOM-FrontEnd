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
import ReviewModal from "./ReviewModal";
import { useReview } from "../hooks/useReview";

//리뷰
const Review = ({
  contentId,
  reviewId,
  imagePath,
  nickname,
  date,
  text,
  rating,
  title,
  isUser,
}) => {
  const { deleteReviewMutate } = useReview();

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
          {title && <span>{title}</span>}
          <RightGroup>
            <Icon>
              <ReviewModal contentId={contentId}>
                <FaPen size={25} />
              </ReviewModal>
            </Icon>
            <Icon>
              <FaTrash size={25} onClick={() => deleteReviewMutate(reviewId)} />
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
