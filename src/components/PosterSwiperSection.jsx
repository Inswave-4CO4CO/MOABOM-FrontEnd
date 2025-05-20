import { Box, Heading, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import PosterCard from "./PosterCard";

const PosterSwiperSection = ({ title, data }) => (
  <Box my={10} px={4} w="80%" mx="auto">
    <Heading fontSize="30px" mb={4} ml={8}>
      {title}
    </Heading>
    <Swiper
      modules={[Navigation]}
      spaceBetween={4}
      slidesPerView={5}
      slidesPerGroup={5}
      navigation
    >
      {data.map((item) => (
        <SwiperSlide key={item.contentId} style={{ width: "100%" }}>
          <Flex justify="center" align="center" h="100%">
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
