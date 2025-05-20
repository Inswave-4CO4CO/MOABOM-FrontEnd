import React from "react";
import { Heading, Stack } from "@chakra-ui/react";
import Poster from "./Poster";

const PosterCard = React.forwardRef(({ src, title, ...props }, ref) => {
  return (
    <Stack ref={ref} {...props}>
      <Poster src={src} />
      <Heading size="lg">{title}</Heading>
    </Stack>
  );
});

export default PosterCard;
