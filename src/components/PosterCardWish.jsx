import { Center, Heading, HStack, Stack } from "@chakra-ui/react";
import Poster from "./Poster";
import { GrayText } from "../styles/components/PosterCardWish";

const PosterCardWish = ({
  src,
  title,
  runningTime,
  releaseDate,
  madeIn,
  crew,
  cast,
  ott,
}) => {
  return (
    <HStack align="flex-start">
      <Poster src={src} />
      <Center style={{ paddingLeft: "1rem" }} w="100%">
        <Stack gap="1" w="100%">
          <Heading size="2xl" mb="3">
            {title}
          </Heading>
          <GrayText>개봉일: {releaseDate}</GrayText>
          <GrayText>제작국가: {madeIn}</GrayText>
          <GrayText>러닝타임: {runningTime}</GrayText>
          <GrayText>제작진: {crew}</GrayText>
          <GrayText
            maxW="300px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            display="block"
            title={crew}
          >
            출연진: {cast}
          </GrayText>
          <GrayText>OTT: {ott}</GrayText>
        </Stack>
      </Center>
    </HStack>
  );
};

export default PosterCardWish;
