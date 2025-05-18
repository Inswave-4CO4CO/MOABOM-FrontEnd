import { Box, Heading, Flex } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import PosterCard from './PosterCard';

const PosterSwiperSection = ({ title, data }) => (
  <Box my={10} px={4}>
    <Heading fontSize="20px" mb={4} ml={58}>{title}</Heading>
    <Swiper
      modules={[Navigation]}
      spaceBetween={15}
      slidesPerView={5}
      navigation
    >
      {data.map((item) => (
        <SwiperSlide key={item.contentId}>
          <Flex justify="center" align="center">
            <PosterCard
                title={item.title}
                src={item.poster}
                ottname={item.ottName}
            />
        </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

export default PosterSwiperSection;
