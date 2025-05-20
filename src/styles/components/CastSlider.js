import styled from "styled-components";

export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;

  .swiper {
    padding: 10px 20px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
  }

  &:hover .nav-button {
    opacity: 1;
  }
`;

export const SwiperButton = styled.div`
  position: absolute;
  top: 37%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: 50%;
  padding: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;

  svg {
    font-size: 50px;
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;
