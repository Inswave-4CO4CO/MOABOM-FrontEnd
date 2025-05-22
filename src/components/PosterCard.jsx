import React from "react";
import {
  StyledCard,
  PosterWrapper,
  Title,
} from "../styles/components/PosterCard";
import Poster from "./Poster";

const PosterCard = React.forwardRef(
  ({ src, title, ottname, onClick, sx, ...props }, ref) => {
    return (
      <StyledCard ref={ref} onClick={onClick} sx={sx} {...props}>
        <PosterWrapper>
          <Poster src={src} width="100%" height="100%" objectFit="cover" />
        </PosterWrapper>
        <Title size="md" noOfLines={2}>
          {title}
        </Title>
      </StyledCard>
    );
  }
);

export default PosterCard;
