import { Image } from "@chakra-ui/react";
import styled from "styled-components";

const PosterImage = styled(Image)`
  max-width: 200px;
`;

const Poster = ({ src }) => {
  return <PosterImage src={src} alt={src} />;
};

export default Poster;
