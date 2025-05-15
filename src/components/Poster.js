import { Image } from "@chakra-ui/react";

const Poster = ({ src }) => {
  return <Image style={{ maxWidth: "200px" }} src={src} alt={src} />;
};

export default Poster;
