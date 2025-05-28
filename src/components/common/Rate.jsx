import React from "react";
import imdbLogo from "../assets/images/imdb.png";
import {
  RateContainer,
  IconContainer,
  RateImage,
  StyledFaStar,
} from "../../styles/components/Rate";

const Rate = ({ rating, isIMDB = false, ...props }) => {
  return (
    <RateContainer {...props}>
      <IconContainer>
        {isIMDB ? <RateImage src={imdbLogo} alt="imdb" /> : <StyledFaStar />}
      </IconContainer>
      <span>
        {rating ? (
          <span>{rating.toString().length === 1 ? rating + ".0" : rating}</span>
        ) : (
          "0.0"
        )}
      </span>
    </RateContainer>
  );
};

export default Rate;
