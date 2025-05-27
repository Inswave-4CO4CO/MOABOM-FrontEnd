import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getMainContents } from "../services/api/mainPageService";
import { useOttFilter } from "../hooks/useOttFilter";
import BannerImage from "../components/BannerImage";
import OttButtonList from "../components/OttButtonList";
import PosterSwiperSection from "../components/PosterSwiperSection";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";

const StyledBox = styled(Box)`
  .swiper-pagination-bullet {
    background: #fff8f0 !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0.6;
    color: #ffa07a !important;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 2rem !important;
    font-weight: 600 !important;
  }
`;

const MainPage = () => {
  const {
    data = { upcoming: [], new: [], rating: [], end: [] },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mainContent"],
    queryFn: getMainContents,
    staleTime: 1000 * 60 * 5,
  });

  const { selectedOtts, toggleOtt, filterIncludeSelected } = useOttFilter();
  const navigate = useNavigate();

  if (isError) return <p>에러 발생: {error.message}</p>;

  return (
    <>
      <StyledBox>
        {isLoading ? (
          <Skeleton height="400px" mb={6} />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {data.upcoming.map((item) => (
              <SwiperSlide key={item.contentId}>
                <BannerImage
                  src={item.image}
                  title={item.title}
                  releaseDate={item.releaseDate}
                  ottname={item.ottName}
                  isMain={true}
                  onClick={() => navigate(`/detail/${item.contentId}`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </StyledBox>
      <Flex justify="center" align="center" mt={8} py={4}>
        {isLoading ? (
          <Skeleton height="40px" width="80%" borderRadius="md" />
        ) : (
          <OttButtonList selectedOtts={selectedOtts} onToggleOtt={toggleOtt} />
        )}
      </Flex>

      <PosterSwiperSection
        title="지금 막 나온 따끈따끈 신작!"
        data={filterIncludeSelected(data.new)}
        isLoading={isLoading}
      />
      <PosterSwiperSection
        title="요즘 가장 핫한 콘텐츠는?"
        data={filterIncludeSelected(data.rating)}
        isLoading={isLoading}
      />
      <PosterSwiperSection
        title="곧 사라져요! 놓치면 후회할 작품들"
        data={filterIncludeSelected(data.end)}
        isLoading={isLoading}
      />
    </>
  );
};

export default MainPage;
