import { Center, Heading, HStack, Stack } from "@chakra-ui/react";
import Poster from "./Poster";
import { GrayText } from "../styles/components/PosterCardWhis";

const PosterCardWish = ({
  src,
  title,
  runningTime,
  releaseDate,
  madeIn,
  cast,
  crew,
  ott,
}) => {
  return (
    <HStack>
      <Poster src={src} />
      <Center style={{ paddingLeft: "1rem" }}>
        <Stack gap="1">
          <Heading size="2xl" mb="3">
            {title}
          </Heading>
          <GrayText>개봉일: {releaseDate}</GrayText>
          <GrayText>제작국가: {madeIn}</GrayText>
          <GrayText>러닝타임: {runningTime}</GrayText>
          <GrayText>제작진: {cast}</GrayText>
          <GrayText>출연진: {crew}</GrayText>
          <GrayText>OTT: {ott}</GrayText>
        </Stack>
      </Center>
    </HStack>
  );
};

export default PosterCardWish;
