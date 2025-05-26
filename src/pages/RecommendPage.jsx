import {
  Box,
  Flex,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PosterSwiperSection from "../components/PosterSwiperSection";
import Text from "../components/Text";
import PlanTable from "../components/PlanTable";

const RecommendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const data = location.state?.result ?? { first: {}, second: {}, third: {} };

  useEffect(() => {
    if (location.state?.result) {
      const timer = setTimeout(() => setIsLoading(false), 1000); // 1초 로딩 시간 가정
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (!location.state?.result) {
    return (
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        direction="column"
        p={10}
      >
        <Box fontSize="xl" mb={4}>
          추천 정보를 찾을 수 없습니다.
        </Box>
        <button onClick={() => navigate("/")}>홈으로 이동</button>
      </Flex>
    );
  }

  const mergedPlans = [
    ...data.first.plan.map((p) => ({ ...p, ottName: data.first.ottName })),
    ...data.second.plan.map((p) => ({ ...p, ottName: data.second.ottName })),
    ...data.third.plan.map((p) => ({ ...p, ottName: data.third.ottName })),
  ];

  return (
    <Flex direction="column" align="center">
      <Box width="100%" px={170} mt={10}>
        {isLoading ? (
          <SkeletonText noOfLines={1} spacing="4" width="200px" />
        ) : (
          <Text text={data.first.ottName} count={data.first.contents.length} />
        )}
      </Box>
      <Box width="100%">
        <PosterSwiperSection data={data.first.contents} isLoading={isLoading} />
      </Box>

      <Box width="100%" px={170}>
        {isLoading ? (
          <SkeletonText noOfLines={1} spacing="4" width="200px" />
        ) : (
          <Text
            text={data.second.ottName}
            count={data.second.contents.length}
          />
        )}
      </Box>
      <Box width="100%">
        <PosterSwiperSection
          data={data.second.contents}
          isLoading={isLoading}
        />
      </Box>

      <Box width="100%" px={170}>
        {isLoading ? (
          <SkeletonText noOfLines={1} spacing="4" width="200px" />
        ) : (
          <Text text={data.third.ottName} count={data.third.contents.length} />
        )}
      </Box>
      <Box width="100%">
        <PosterSwiperSection data={data.third.contents} isLoading={isLoading} />
      </Box>

      <Box width="100%" px={170} mt={10}>
        <PlanTable plans={mergedPlans} isLoading={isLoading} />
      </Box>
    </Flex>
  );
};

export default RecommendPage;
