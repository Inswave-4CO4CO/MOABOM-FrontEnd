import React, { useEffect, useState } from "react";
import { getContentById } from "../services/contentDetailService";

//컴포넌트
import BannerImage from "../components/BannerImage";
import PosterCard from "../components/PosterCard";
import OttButton from "../components/OttButton";
import WatchButton from "../components/WatchButton";
import styled from "styled-components";
import Review from "../components/Review";
import ProfileIcon from "../components/ProfileIcon";
import Text from "../components/Text";

//Ott 이미지
import AppleTv from "../assets/images/AppleTv.png";
import CouPangPlay from "../assets/images/CoupangPlay.png";
import Disney from "../assets/images/Disney.png";
import Laftel from "../assets/images/Laftel.png";
import Netflix from "../assets/images/Netflix.png";
import Tving from "../assets/images/Tving.png";
import Uplus from "../assets/images/Uplus.png";
import Watcha from "../assets/images/Watcha.png";
import Wavve from "../assets/images/Wavve.png";

export const ContentDetailPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ott = {
    "Apple TV": AppleTv,
    쿠팡플레이: CouPangPlay,
    "디즈니+": Disney,
    라프텔: Laftel,
    넷플릭스: Netflix,
    티빙: Tving,
    "U+모바일tv": Uplus,
    왓챠: Watcha,
    웨이브: Wavve,
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getContentById(1);
        setContent(response.data);
      } catch (err) {
        setError(err);
        console.error("콘텐츠 데이터 가져오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (content) {
      console.log("콘텐츠 상세 정보:", content);
    }
  }, [content]);

  if (loading) {
    return <div>콘텐츠 정보를 로딩 중입니다...</div>;
  }

  if (error) {
    return <div>콘텐츠 정보를 가져오는데 실패했습니다: {error.message}</div>;
  }

  return (
    <>
      <BannerImage
        rating={content.content.rating}
        src={content.content.image}
        title={content.content.title}
        genre={content.genre.join(", ")}
        category={content.content.category}
        madeIn={content.content.madeIn}
        ageRating={content.content.ageRating}
        runningTime={content.content.runningTime}
        releaseDate={content.content.releaseDate}
        imdbRating={content.content.imdbRating}
        isDetail={true}
      />
      <ContentDetail>
        <PosterCard src={content.content.poster} />
        <div>
          <p>줄거리</p>
          <span>{content.content.description}</span>
          <p>보러가기</p>

          {content.ott.map((value, index) => (
            <a
              key={index}
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OttButton imageSrc={ott[value.ottName]} />
            </a>
          ))}
          <WatchButtonGroup>
            <WatchButton type={"WANT"} isDisable={true} />
            <WatchButton type={"ING"} isDisable={true} />
            <WatchButton type={"ED"} isDisable={false} />
            <WatchButton type={"REVIEW"} isDisable={true} />
          </WatchButtonGroup>
        </div>
      </ContentDetail>

      <ContentCastAndCrew>
        <Text text={"출연자"} />
        <CastCrewGroup>
          {content.cast.map((value, index) => (
            <ProfileIcon imagePath={value.image} name={value.personName} />
          ))}
        </CastCrewGroup>
        <Text text={"제작진"} />
        <CastCrewGroup>
          {content.crew.map((value, index) => (
            <ProfileIcon imagePath={value.image} name={value.personName} />
          ))}
        </CastCrewGroup>
      </ContentCastAndCrew>

      <ReviewGroup>
        {content.review.map((value, index) => (
          <Review
            key={value.reviewId}
            rating={value.rating}
            date={value.createdAt}
            text={value.reviewText}
          />
        ))}
      </ReviewGroup>
    </>
  );
};

const ContentDetail = styled.div`
  display: flex;
`;

const WatchButtonGroup = styled.div`
  display: flex;
`;

const ContentCastAndCrew = styled.div`
  display: flex;
  flex-direction: column;
`;
const CastCrewGroup = styled.div`
  display: flex;
`;
const ReviewGroup = styled.div`
  display: flex;
`;
