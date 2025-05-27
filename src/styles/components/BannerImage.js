import { Stack } from "@chakra-ui/react";
import styled from "styled-components";

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 650px;
  object-position: center;
`;

export const BannerImageContainer = styled.div`
  position: relative;
`;

export const TextContainer = styled(Stack)`
  position: absolute;
  top: ${(props) => (props.$isDetail ? "60%" : "75%")};
  left: 8%;
  color: white;
`;
