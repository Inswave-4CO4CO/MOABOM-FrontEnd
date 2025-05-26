import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
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
      <Box width="100%" px={170}>
        {isLoading ? (
          <Skeleton height="40px" mb={2} />
        ) : (
          <Text text={data.first.ottName} count={data.first.contents.length} />
        )}
      </Box>
      <Box width="100%">
        {isLoading ? (
          <Skeleton height="250px" />
        ) : (
          <PosterSwiperSection data={data.first.contents} />
        )}
      </Box>

      <Box width="100%" px={170}>
        {isLoading ? (
          <Skeleton height="40px" mb={2} />
        ) : (
          <Text
            text={data.second.ottName}
            count={data.second.contents.length}
          />
        )}
      </Box>
      <Box width="100%">
        {isLoading ? (
          <Skeleton height="250px" />
        ) : (
          <PosterSwiperSection data={data.second.contents} />
        )}
      </Box>

      <Box width="100%" px={170}>
        {isLoading ? (
          <Skeleton height="40px" mb={2} />
        ) : (
          <Text text={data.third.ottName} count={data.third.contents.length} />
        )}
      </Box>
      <Box width="100%">
        {isLoading ? (
          <Skeleton height="250px" />
        ) : (
          <PosterSwiperSection data={data.third.contents} />
        )}
      </Box>

      <Box width="100%" px={170} mt={10}>
        {isLoading ? (
          <Stack gap="4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} height="40px" />
            ))}
          </Stack>
        ) : (
          <PlanTable plans={mergedPlans} />
        )}
      </Box>
    </Flex>
  );
};

export default RecommendPage;
