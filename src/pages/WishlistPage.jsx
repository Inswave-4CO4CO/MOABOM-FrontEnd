import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import PosterCardWish from "../components/PosterCardWish";
import { getWishContents } from "../services/api/wishlistService";
import CheckBox from "../components/CheckBox";
import BodyButton from "../components/BodyButton";

const PageWrapper = styled.div`
  padding: 60px 20px;
  background-color: #fef3e8;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 36px;
  text-align: center;
`;

const Layout = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightPanel = styled.div`
  width: 260px;
  margin-left: 40px;
  position: sticky;
  top: 60px;
  height: fit-content;
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
`;

const ContentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const SelectedList = styled.div`
  font-size: 14px;
  margin: 16px 0;
  color: #333;
  line-height: 1.5;
`;

const WishlistPage = () => {
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

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생: {error.message}</div>;

  return (
    <PageWrapper>
      <Title>보고싶다한 작품</Title>
      <Layout>
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

        <RightPanel>
          <h3>선택한 작품</h3>
          <SelectedList>
            총 {selectedTitles.length}개
            <br />
            {selectedTitles.map((item) => item.title).join(", ")}
          </SelectedList>
          <BodyButton width="100%" onClick={() => navigate("/recommand/ott")}>
            OTT 추천받기
          </BodyButton>
        </RightPanel>
      </Layout>
    </PageWrapper>
  );
};

export default WishlistPage;
