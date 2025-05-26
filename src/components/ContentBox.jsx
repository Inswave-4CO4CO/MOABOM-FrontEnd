// import React, { useState } from "react";
import OttButtonList, { ottList } from "./OttButtonList";
import TabComponent from "./Tab";
import PosterCard from "./PosterCard";
import Review from "./Review";
import {
  ContentBoxContainer,
  ContentBoxHeader,
  ContentBoxTitle,
  OttButtonContainer,
  ContentGrid,
  PosterItem,
  PosterContainer,
} from "../styles/components/ContentBox";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

const ContentBox = ({
  contentList = [],
  title,
  tabs,
  defaultTab,
  onTabChange,
  selectedOtts,
  setSelectedOtts,
  scrollContainerRef,
  isReview = false,
  handleReviewUpdated,
  image,
  isLoading,
  ...props
}) => {
  const navigate = useNavigate();

  const handleOttSelect = (ottName) => {
    setSelectedOtts((prev) => {
      const isSelected = prev.includes(ottName);
      const allOttNames = ottList.map((ott) => ott.alt);

      if (prev.length === allOttNames.length) {
        return [ottName];
      } else {
        const updated = isSelected
          ? prev.filter((o) => o !== ottName)
          : [...prev, ottName];

        return updated.length === 0 ? [...allOttNames] : updated;
      }
    });
  };

  return (
    <ContentBoxContainer {...props}>
      <ContentBoxHeader>
        <ContentBoxTitle>{title}</ContentBoxTitle>
        {!isReview ? (
          <OttButtonContainer>
            <OttButtonList
              selectedOtts={selectedOtts}
              onToggleOtt={handleOttSelect}
            />
          </OttButtonContainer>
        ) : (
          <></>
        )}
        <TabComponent
          list={tabs}
          onTabChange={onTabChange}
          value={defaultTab}
        />
      </ContentBoxHeader>
      <ContentGrid
        className="content-scroll-area"
        ref={scrollContainerRef}
        $isReview={isReview}
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) =>
            isReview ? (
              <Skeleton
                key={idx}
                height="300px"
                width="250px"
                borderRadius="10px"
              />
            ) : (
              <Skeleton
                key={idx}
                height="300px"
                width="200px"
                borderRadius="10px"
              />
            )
          )
        ) : contentList.length !== 0 ? (
          isReview ? (
            contentList.map((value) => (
              <Review
                reviewId={value.reviewId}
                contentId={value.contentId}
                key={value.reviewId}
                rating={value.rating}
                date={value.createdAt}
                text={value.reviewText}
                nickname={value.userId}
                isUser={true}
                title={value.title}
                imagePath={image}
                onUpdate={handleReviewUpdated}
              />
            ))
          ) : (
            contentList.map((content, index) => (
              <PosterCard
                key={content.contentId || index}
                src={content.poster}
                title={content.title}
                onClick={() => {
                  navigate(`/detail/${content.contentId}`);
                }}
              />
            ))
          )
        ) : (
          <div style={{ marginBottom: "100px" }}>저장된 목록이 없습니다</div>
        )}
      </ContentGrid>
    </ContentBoxContainer>
  );
};

export default ContentBox;
