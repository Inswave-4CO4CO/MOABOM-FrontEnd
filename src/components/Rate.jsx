import React from 'react'
import imdbLogo from '../assets/images/imdb.png';
import { RateContainer, IconContainer, RateImage, StyledFaStar } from '../styles/components/Rate';

const Rate = ({rating, isIMDB}) => {
  return (
    <RateContainer>
      <IconContainer>
        {isIMDB ? (
          <RateImage src={imdbLogo} alt='imdb' />
        ) : (
          <StyledFaStar />
        )}
      </IconContainer>
      <span>{rating}</span>
    </RateContainer>
  )
}

export default Rate