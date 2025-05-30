import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProfileIcon from "../common/Profile";
import {
  SliderWrapper,
  SwiperButton,
} from "../../styles/components/CastSlider";
import { useNavigate } from "react-router-dom";

import personInfoType from "../../types/personInfoType";

const CastSlider = ({ castList }) => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params?.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();

      handleSlideChange();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const handleSlideChange = () => {
    if (!swiperInstance) return;

    const isAtStart = swiperInstance.isBeginning;
    const isAtEnd = swiperInstance.isEnd;

    setIsPrevDisabled(isAtStart);
    setIsNextDisabled(isAtEnd);
  };

  return (
    <SliderWrapper>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerGroup={5}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        breakpoints={{
          320: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 5, slidesPerGroup: 5 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
          1280: { slidesPerView: 9, slidesPerGroup: 9 },
        }}
      >
        {castList.map((cast, index) => (
          <SwiperSlide key={`cast-${index}`}>
            <ProfileIcon
              imagePath={cast.image}
              name={cast.personName}
              onClick={() => navigate(`/person/${cast.personId}`)}
              personId={cast.personId}
              role={personInfoType[cast.role]}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperButton
        className={`nav-button prev ${isPrevDisabled ? "disabled" : ""}`}
        ref={prevRef}
        disabled={isPrevDisabled}
      >
        <FiChevronLeft />
      </SwiperButton>

      <SwiperButton
        className={`nav-button next ${isNextDisabled ? "disabled" : ""}`}
        ref={nextRef}
        disabled={isNextDisabled}
      >
        <FiChevronRight />
      </SwiperButton>
    </SliderWrapper>
  );
};

export default CastSlider;
