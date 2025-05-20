import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProfileIcon from "../components/ProfileIcon";
import { SliderWrapper, SwiperButton } from "../styles/components/CastSlider";

const CastSlider = ({ castList }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

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
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <SliderWrapper>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerGroup={5}
        onSwiper={setSwiperInstance}
        breakpoints={{
          320: { slidesPerView: 3, slidesPerGroup: 3 },
          768: { slidesPerView: 5, slidesPerGroup: 5 },
          1024: { slidesPerView: 6, slidesPerGroup: 6 },
          1280: { slidesPerView: 9, slidesPerGroup: 9 },
        }}
      >
        {castList.map((cast, index) => (
          <SwiperSlide key={`cast-${index}`}>
            <ProfileIcon imagePath={cast.image} name={cast.personName} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperButton className="nav-button prev" ref={prevRef}>
        <FiChevronLeft />
      </SwiperButton>
      <SwiperButton className="nav-button next" ref={nextRef}>
        <FiChevronRight />
      </SwiperButton>
    </SliderWrapper>
  );
};

export default CastSlider;
