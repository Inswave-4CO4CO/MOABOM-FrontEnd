import { Heading, Stack } from "@chakra-ui/react";
import Poster from "./Poster";

const PosterCard = ({ src, title }) => {
  return (
    <Stack>
      <Poster src={src} />
      <Heading size="lg">{title}</Heading>
    </Stack>
  );
};

export default PosterCard;
