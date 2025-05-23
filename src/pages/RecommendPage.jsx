import { Box } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import PosterSwiperSection from "../components/PosterSwiperSection";
import Text from "../components/Text";
import PlanTable from "../components/PlanTable";

const RecommendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.result ?? { first: {}, second: {}, third: {} };

  if (!location.state?.result) {
    return (
      <Box p={10}>
        <p>추천 정보를 찾을 수 없습니다.</p>
        <button onClick={() => navigate("/")}>홈으로 이동</button>
      </Box>
    );
  }

  // 👉 모든 요금제(plan)를 하나로 병합 + ottName 포함
  const mergedPlans = [
    ...data.first.plan.map((p) => ({ ...p, ottName: data.first.ottName })),
    ...data.second.plan.map((p) => ({ ...p, ottName: data.second.ottName })),
    ...data.third.plan.map((p) => ({ ...p, ottName: data.third.ottName })),
  ];

  return (
    <Box p={5}>
      <Text text={data.first.ottName} count={data.first.contents.length} />
      <PosterSwiperSection data={data.first.contents} />

      <Text text={data.second.ottName} count={data.second.contents.length} />
      <PosterSwiperSection data={data.second.contents} />

      <Text text={data.third.ottName} count={data.third.contents.length} />
      <PosterSwiperSection data={data.third.contents} />

      <PlanTable plans={mergedPlans} />
    </Box>
  );
};

export default RecommendPage;
