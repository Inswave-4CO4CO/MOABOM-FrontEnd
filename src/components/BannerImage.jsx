import { Heading, Text } from "@chakra-ui/react";
import {
  BannerImageContainer,
  Image,
  TextContainer,
} from "../styles/components/BannerImage";
import Rate from "./Rate";

const BannerImage = ({
  rating,
  src,
  title,
  genre,
  category,
  madeIn,
  runningTime,
  ageRating,
  releaseDate,
  imdbRating,
  ottname,
  isMain = false,
  isDetail = false,
}) => {
  // rating 추후 추가 예정
  return (
    <BannerImageContainer>
      <Image src={src} />
      <TextContainer $isDetail={isDetail} $isMain={isMain} gap="1">
        {isDetail && <Rate style={{ fontSize: "35px" }} rating={rating} />}
        <Heading size="6xl">{title}</Heading>
        {isMain && (
          <>
            <Text textStyle="lg">
              {releaseDate} {ottname} 공개
            </Text>
          </>
        )}
        {isDetail && (
          <>
            <Text textStyle="lg">
              {genre}, {category} · {madeIn}
            </Text>
            <Text textStyle="lg">
              {runningTime} · {ageRating}
            </Text>
            <Text textStyle="lg" style={{ display: "flex" }}>
              {releaseDate}&nbsp; · &nbsp;
              <Rate rating={imdbRating} isIMDB={true} />
            </Text>
          </>
        )}
      </TextContainer>
    </BannerImageContainer>
  );
};

export default BannerImage;
