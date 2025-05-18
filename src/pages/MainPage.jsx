import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BannerImage from '../components/BannerImage';
import OttButtonList from '../components/OttButtonList';
import PosterSwiperSection from '../components/PosterSwiperSection';
import { Footer } from '../components/Footer';

const { VITE_API_URL } = import.meta.env;

export const baseInstance = axios.create({
  baseURL: VITE_API_URL,
});

const MainPage = () => {
  const [data, setData] = useState({
    upcoming: [],
    new: [],
    rating: [],
    end: [],
  });

  const [selectedOtts, setSelectedOtts] = useState([]);
  // 선택 토글 함수
  const toggleOtt = (ottName) => {
    setSelectedOtts(prev => 
      prev.includes(ottName) 
        ? prev.filter(o => o !== ottName) 
        : [...prev, ottName]
    );
  };

  // PosterSwiperSection 필터링 (exclude selected OTTs)
  const filterExcludeSelected = (list) => 
    selectedOtts.length === 0 
      ? list 
      : list.filter(item => !selectedOtts.includes(item.ottName));

  useEffect(() => {
  axios.get('/content')
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => console.error(err));
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
        data={filterExcludeSelected(data.new)}
      />
      <PosterSwiperSection
        title="요즘 가장 핫한 콘텐츠는?"
        data={filterExcludeSelected(data.rating)}
      />
      <PosterSwiperSection
        title="곧 사라져요! 놓치면 후회할 작품들"
        data={filterExcludeSelected(data.end)}
      />

      <Footer />
    </Box>
  );
};

export default MainPage;
