import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import BannerImage from "../components/BannerImage";
import OttButtonList from "../components/OttButtonList";
import PosterSwiperSection from "../components/PosterSwiperSection";
import { DOMAIN } from "../services/domain";
import { baseInstance } from "../services/axiosInstance";

const allOttNames = [
  "넷플릭스",
  "웨이브",
  "쿠팡플레이",
  "왓챠",
  "티빙",
  "라프텔",
  "디즈니+",
  "Apple TV",
  "U+모바일tv",
];

const MainPage = () => {
  const [data, setData] = useState({
    upcoming: [],
    new: [],
    rating: [],
    end: [],
  });

  const [selectedOtts, setSelectedOtts] = useState([...allOttNames]);

  // OTT 선택 토글 함수
  const toggleOtt = (ottName) => {
    setSelectedOtts((prev) => {
      const isSelected = prev.includes(ottName);

      if (prev.length === allOttNames.length) {
        // 전체 선택 상태에서 클릭하면 해당 하나만 남김
        return [ottName];
      } else {
        const updated = isSelected
          ? prev.filter((o) => o !== ottName)
          : [...prev, ottName];

        // 아무것도 선택되지 않으면 다시 전체 선택
        return updated.length === 0 ? [...allOttNames] : updated;
      }
    });
  };

  // 선택된 OTT만 필터링
  const filterIncludeSelected = (list) =>
    selectedOtts.length === 0
      ? list
      : list.filter((item) => selectedOtts.includes(item.ottName));

  useEffect(() => {
    const fetchMainContent = async () => {
      try {
        const res = await baseInstance.get(DOMAIN.MAIN_CONTENT);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMainContent();
  }, []);

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

      <Flex justify="center" align="center" mt={8}>
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
