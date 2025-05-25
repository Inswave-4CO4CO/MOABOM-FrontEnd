import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PosterCardWish from "../components/PosterCardWish";
import { getWishContents } from "../services/api/wishlistService";
import { postRecommendOtts } from "../services/api/recommendService";
import CheckBox from "../components/CheckBox";
import BodyButton from "../components/BodyButton";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
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

  if (isLoading)
    return (
      <PageWrapper>
        <Layout>
          <LeftWrapper>
            <Title>보고싶다한 작품</Title>
            <LeftPanel>
              {[...Array(5)].map((_, idx) => (
                <ContentItem key={idx}>
                  <Skeleton boxSize="40px" borderRadius="4px" />
                  <SkeletonText flex="1" noOfLines={3} spacing="4" />
                </ContentItem>
              ))}
            </LeftPanel>
          </LeftWrapper>
        </Layout>
      </PageWrapper>
    );

  if (isError) return <div>오류 발생: {error.message}</div>;

  return (
    <PageWrapper>
      <Layout>
        <LeftWrapper>
          <Title>보고싶다한 작품</Title>
          <LeftPanel>
            {wishlist.map((item) => (
              <ContentItem key={item.contentId}>
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
        <BodyButton width="220px" onClick={handleRecommend}>
          OTT 추천받기
        </BodyButton>
      </RightPanel>
    </PageWrapper>
  );
};

export default WishlistPage;
