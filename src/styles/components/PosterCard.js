import styled from "styled-components";
import { Stack, Box, Heading } from "@chakra-ui/react";

export const StyledCard = styled(Stack)`
  align-items: center;
  spacing: 8px; /* Chakra 의 spacing={2} 정도 값 */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const PosterWrapper = styled(Box)`
  width: 200px;
  height: 285px;
  overflow: hidden;
`;

export const Title = styled(Heading)`
  margin-top: 8px; /* Chakra 의 mt={2} */
  width: 200px;
`;
