import { Heading } from "@chakra-ui/react";
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

const Title = styled(Heading)`
  color: white;
  position: absolute;
  top: 75%;
  left: 10%;
`;

const BannerImage = ({ src, title }) => {
  return (
    <BannerImageContainer>
      <Image src={src} />
      <Title size="6xl">{title}</Title>
    </BannerImageContainer>
  );
};

export default BannerImage;
