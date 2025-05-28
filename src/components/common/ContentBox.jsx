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
  DynamicMessage,
  DynamicMessageWrapper,
} from "../../styles/components/ContentBox";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";

const ContentBox = ({
  contentList = [],
  title,
  tabs,
  defaultTab,
  isLoading,
  onTabChange,
  selectedOtts,
  setSelectedOtts,
  scrollContainerRef,
  isReview = false,
  handleReviewUpdated,
  image,
  name,
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
      {isLoading === false && contentList.length === 0 ? (
        <DynamicMessageWrapper>
          <DynamicMessage>이곳은 비어있어요</DynamicMessage>
        </DynamicMessageWrapper>
      ) : (
        <ContentGrid
          className="content-scroll-area"
          ref={scrollContainerRef}
          $isReview={isReview}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) =>
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
            : isReview
            ? contentList.map((value) => (
                <Review
                  key={value.reviewId}
                  reviewId={value.reviewId}
                  contentId={value.contentId}
                  rating={value.rating}
                  date={value.createdAt}
                  text={value.reviewText}
                  nickname={name}
                  isUser={true}
                  title={value.title}
                  imagePath={image}
                  onUpdate={handleReviewUpdated}
                />
              ))
            : contentList.map((content, index) => (
                <PosterCard
                  key={content.contentId || index}
                  src={content.poster}
                  title={content.title}
                  onClick={() => {
                    navigate(`/detail/${content.contentId}`);
                  }}
                />
              ))}
        </ContentGrid>
      )}
    </ContentBoxContainer>
  );
};

export default ContentBox;
