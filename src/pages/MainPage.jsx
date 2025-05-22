import { Box, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getMainContents } from "../services/api/mainPageService";
import { useOttFilter } from "../hooks/useOttFilter";
import BannerImage from "../components/BannerImage";
import OttButtonList from "../components/OttButtonList";
import PosterSwiperSection from "../components/PosterSwiperSection";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생: {error.message}</p>;

  return (
    <Box>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {data.upcoming.map((item) => (
          <SwiperSlide key={item.contentId}>
            <BannerImage
              src={item.image}
              title={item.title}
              releaseDate={item.releaseDate}
              ottname={item.ottName}
              isMain={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Flex justify="center" align="center" mt={8} py={4}>
        <OttButtonList selectedOtts={selectedOtts} onToggleOtt={toggleOtt} />
      </Flex>

      <PosterSwiperSection
        title="지금 막 나온 따끈따끈 신작!"
        data={filterIncludeSelected(data.new)}
      />
      <PosterSwiperSection
        title="요즘 가장 핫한 콘텐츠는?"
        data={filterIncludeSelected(data.rating)}
      />
      <PosterSwiperSection
        title="곧 사라져요! 놓치면 후회할 작품들"
        data={filterIncludeSelected(data.end)}
      />
    </Box>
  );
};

export default MainPage;
