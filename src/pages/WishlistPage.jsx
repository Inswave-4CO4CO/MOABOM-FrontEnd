import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PosterCardWish from "../components/PosterCardWish";
import { getWishContents } from "../services/api/wishlistService";
import { postRecommendOtts } from "../services/api/recommendService";
import CheckBox from "../components/CheckBox";
import BodyButton from "../components/BodyButton";
import { Skeleton } from "@chakra-ui/react";
import {
  PageWrapper,
  Layout,
  LeftWrapper,
  Title,
  LeftPanel,
  ContentItem,
  RightPanel,
  SelectedList,
} from "../styles/pages/WishlistPage";

const WishlistPage = () => {
  const navigate = useNavigate();

  const handleRecommend = async () => {
    const selectedContents = wishlist.filter(
      (item) => checkedItems[item.contentId]
    );

    if (selectedContents.length === 0) {
      alert("최소 1개 이상의 작품을 선택해주세요.");
      return;
    }

    const response = await postRecommendOtts(selectedContents);
    navigate("/recommend/ott", { state: { result: response } });
  };

  const {
    data: wishlist,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishContents,
  });

  const [checkedItems, setCheckedItems] = useState({});

  const onCheckChange = (contentId) => (e) => {
    setCheckedItems((prev) => ({
      ...prev,
      [contentId]: e.target.checked,
    }));
  };

  const selectedTitles =
    wishlist?.filter((item) => checkedItems[item.contentId]) ?? [];

  if (isError) return <div>오류 발생: {error.message}</div>;

  return (
    <PageWrapper>
      <Layout>
        <LeftWrapper>
          <Title>보고싶다한 작품</Title>
          <LeftPanel>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <ContentItem key={index} style={{ marginBottom: "24px" }}>
                    {/* 체크박스 자리 */}
                    <Skeleton height="20px" width="20px" mr="10px" />

                    {/* PosterCardWish 모양에 맞춘 레이아웃 */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                      }}
                    >
                      {/* 포스터 자리 */}
                      <Skeleton
                        height="300px"
                        width="200px"
                        borderRadius="md"
                      />

                      {/* 설명 영역 */}
                      <div style={{ paddingLeft: "1rem", flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            width: "100%",
                          }}
                        >
                          <Skeleton
                            height="32px"
                            width="60%"
                            style={{ marginBottom: "0.75rem" }}
                          />
                          <Skeleton height="16px" width="40%" />
                          <Skeleton height="16px" width="35%" />
                          <Skeleton height="16px" width="30%" />
                          <Skeleton height="16px" width="50%" />
                          <Skeleton height="16px" width="70%" />
                          <Skeleton height="16px" width="40%" />
                        </div>
                      </div>
                    </div>
                  </ContentItem>
                ))
              : wishlist.map((item) => (
                  <ContentItem
                    key={item.contentId}
                    style={{ marginBottom: "24px" }}
                  >
                    <CheckBox
                      checked={!!checkedItems[item.contentId]}
                      onChange={onCheckChange(item.contentId)}
                    />
                    <PosterCardWish
                      src={item.poster}
                      title={item.title}
                      runningTime={item.runningTime}
                      releaseDate={item.releaseDate}
                      madeIn={item.madeIn}
                      crew={item.crewName}
                      cast={item.castName}
                      ott={item.ottName}
                    />
                  </ContentItem>
                ))}
          </LeftPanel>
        </LeftWrapper>
      </Layout>

      <RightPanel>
        선택한 작품
        <SelectedList>
          <span>선택한 작품 수</span>
          <span>{selectedTitles.length}개</span>
        </SelectedList>
        <SelectedList>
          {selectedTitles.map((item) => item.title).join(", ")}
        </SelectedList>
        <BodyButton
          width="220px"
          onClick={handleRecommend}
          isDisabled={isLoading || selectedTitles.length === 0}
        >
          OTT 추천받기
        </BodyButton>
      </RightPanel>
    </PageWrapper>
  );
};

export default WishlistPage;
