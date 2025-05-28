import { Heading, Text } from "@chakra-ui/react";
import {
  BannerImageContainer,
  Image,
  TextContainer,
} from "../../styles/components/BannerImage";
import Rate from "./Rate";
import styled from "styled-components";

const StyledHeading = styled(Heading)`
  text-shadow: -2px 0px #666666, 0px 2px #666666, 2px 0px #666666,
    0px -2px #666666;
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
  ottname,
  isMain = false,
  isDetail = false,
  onClick,
}) => {
  // rating 추후 추가 예정
  return (
    <BannerImageContainer onClick={onClick} style={{ cursor: "pointer" }}>
      <Image src={src} />
      <TextContainer $isDetail={isDetail} $isMain={isMain} gap="1">
        {isDetail && <Rate style={{ fontSize: "35px" }} rating={rating} />}
        <StyledHeading size="6xl">{title}</StyledHeading>
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
