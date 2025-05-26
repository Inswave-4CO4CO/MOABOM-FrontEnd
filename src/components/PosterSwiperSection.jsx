import { Box, Heading, Flex, Skeleton } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import PosterCard from "./PosterCard";
import { useNavigate } from "react-router-dom";
import { DynamicMessage } from "../styles/components/ContentBox";

const PosterSwiperSection = ({ title, data, isLoading }) => {
  const navigate = useNavigate();
  return (
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
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <SwiperSlide key={idx} style={{ width: "100%" }}>
              <Flex justify="center" align="center" h="100%" my={4}>
                <Skeleton
                  height="300px"
                  width="250px"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                />
              </Flex>
            </SwiperSlide>
          ))
        ) : data.length === 0 ? (
          <Flex justify="center" align="center" h="200px" my={4}>
            <DynamicMessage>이곳은 비어있어요</DynamicMessage>
          </Flex>
        ) : (
          data.map((item) => (
            <SwiperSlide key={item.contentId} style={{ width: "100%" }}>
              <Flex justify="center" align="center" h="100%" my={4}>
                <PosterCard
                  title={item.title}
                  src={item.poster}
                  ottname={item.ottName}
                  onClick={() => navigate(`/detail/${item.contentId}`)}
                />
              </Flex>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Box>
  );
};

export default PosterSwiperSection;
