import { Heading, Stack, Text } from "@chakra-ui/react";
import styled from "styled-components";

const Image = styled.img`
  opacity: 0.7;
  object-fit: cover;
  width: 100%;
  max-height: 650px;
  object-position: center;
`;

const BannerImageContainer = styled.div`
  position: relative;
`;

const TextContainer = styled(Stack)`
  position: absolute;
  top: ${(props) => (props.$isDetail ? "65%" : "75%")};
  left: 8%;
  color: white;
`;

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
  isDetail = false,
}) => {
  // rating 추후 추가 예정
  return (
    <BannerImageContainer>
      <Image src={src} />
      <TextContainer $isDetail={isDetail} gap="1">
        {isDetail && <Heading size="4xl">{rating}</Heading>}
        <Heading size="6xl">{title}</Heading>
        {isDetail && (
          <>
            <Text textStyle="lg">
              {genre}, {category} · {madeIn}
            </Text>
            <Text textStyle="lg">
              {runningTime} · {ageRating}
            </Text>
            <Text textStyle="lg">
              {releaseDate} · {imdbRating}
            </Text>
          </>
        )}
      </TextContainer>
    </BannerImageContainer>
  );
};

export default BannerImage;
