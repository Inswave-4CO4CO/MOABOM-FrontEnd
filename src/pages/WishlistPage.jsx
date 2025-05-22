import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PosterCardWish from "../components/PosterCardWish";
import { getWishContents } from "../services/api/wishlistService";
import CheckBox from "../components/CheckBox";

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

  // 체크박스 상태 (contentId를 key로, boolean값 저장)
  const [checkedItems, setCheckedItems] = useState({});

  // 체크박스 변경 핸들러 (contentId별로 상태 업데이트)
  const onCheckChange = (contentId) => (e) => {
    setCheckedItems((prev) => ({
      ...prev,
      [contentId]: e.target.checked,
    }));
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생: {error.message}</div>;

  return (
    <div>
      {wishlist.map((item) => (
        <div
          key={item.contentId}
          style={{ display: "flex", alignItems: "center", marginBottom: 12 }}
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
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
