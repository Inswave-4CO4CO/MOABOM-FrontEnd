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
  top: 70%;
  left: 8%;
  color: white;
`;

const Title = styled(Heading)``;

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
  isDetail,
}) => {
  // rating 추후 추가 예정
  return (
    <BannerImageContainer>
      <Image src={src} />
      <TextContainer gap="1">
        <Title size="6xl">{title}</Title>
        {isDetail && (
          <>
            <Text textStyle="lg">
              {genre}, {category} · {madeIn}
            </Text>
            <Text textStyle="lg">
              {runningTime} · {ageRating}
            </Text>
            <Text textStyle="lg">{releaseDate}</Text>
          </>
        )}
      </TextContainer>
    </BannerImageContainer>
  );
};

export default BannerImage;
