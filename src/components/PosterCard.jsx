import { Heading, Stack } from "@chakra-ui/react";
import Poster from "./Poster";

const PosterCard = ({ src, title, ottname }) => {
  return (
    <Stack>
      <Poster src={src} alt={ottname} />
      <Heading size="md">{title}</Heading>
    </Stack>
  );
};

export default PosterCard;
