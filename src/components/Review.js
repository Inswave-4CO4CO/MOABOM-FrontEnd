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

export const Review = ({
  imagePath,
  nickname,
  date,
  text,
  rating,
  title,
  isUser,
}) => {
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
          <FaStar size={35} color="FF9266" />
          {rating ? <span>{rating}</span> : "0.0"}
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
              <FaPen size={25} />
            </Icon>
            <Icon>
              <FaTrash size={25} />
            </Icon>
          </RightGroup>
        </ReviewFooter>
      ) : (
        <ReviewFooter />
      )}
    </ReviewContainer>
  );
};
