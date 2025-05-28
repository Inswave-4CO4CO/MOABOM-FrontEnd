import { Box, Heading, Flex, Skeleton } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PosterCard from "./PosterCard";
import { useNavigate } from "react-router-dom";
import { DynamicMessage } from "../../styles/components/ContentBox";
import HeaderButton from "./HeaderButton";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: none;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  &:hover:not(:disabled) {
    background: #ffedd5;
    box-shadow: 0 4px 16px rgba(255, 140, 66, 0.12);
  }
  &:disabled {
    background: #f4f4f4;
    cursor: default;
    svg {
      color: #bdbdbd;
    }
  }
`;

const PrevButton = styled(ArrowButton)`
  left: -56px; // 포스터 영역 왼쪽 바깥에 위치
`;

const NextButton = styled(ArrowButton)`
  right: -56px; // 포스터 영역 오른쪽 바깥에 위치
`;

const SwiperWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PosterSwiperSection = ({ title, data, isLoading }) => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box my={10} px={4} w="80%" mx="auto">
      <Heading fontSize="30px" mb={4} ml={8}>
        {title}
      </Heading>
      <SwiperWrapper className="poster">
        <PrevButton ref={prevRef} className="swiper-button-prev ">
          <IoIosArrowBack size={28} color="#FF8C42" />
        </PrevButton>
        <NextButton ref={nextRef} className="swiper-button-next">
          <IoIosArrowForward size={28} color="#FF8C42" />
        </NextButton>
        <Swiper
          modules={[Navigation]}
          spaceBetween={4}
          slidesPerView={5}
          slidesPerGroup={5}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
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
      </SwiperWrapper>
    </Box>
  );
};

export default PosterSwiperSection;
