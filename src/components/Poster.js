import { Image } from "@chakra-ui/react";
import styled from "styled-components";

const Poster = ({ src }) => {
  return <PosterImage style={{ maxWidth: "200px" }} src={src} alt={src} />;
};

export default Poster;
