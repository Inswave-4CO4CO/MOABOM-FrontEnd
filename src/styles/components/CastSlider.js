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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 5px;
  opacity: 0;
  transition: all 0.3s ease;
  background-color: transparent;
  cursor: pointer;

  svg {
    font-size: 50px;
  }

  &.prev {
    left: -20px;
  }

  &.next {
    right: -20px;
  }

  &.disabled {
    cursor: not-allowed;
    pointer-events: none;

    svg {
      color: rgba(3, 3, 3, 0.5);
      opacity: 0.4;
      transition: all 0.3s ease;
    }
  }
`;
