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

const ContentBox = ({
  contentList = [],
  title,
  tabs,
  defaultTab,
  value,
  onTabChange,
  selectedOtts,
  setSelectedOtts,
  scrollContainerRef,
  isReview = false,
  handleReviewUpdated,
  image,
}) => {
  // const [activeTab, setActiveTab] = useState(defaultTab);

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
    <ContentBoxContainer>
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
        {contentList.length !== 0 ? (
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
              <PosterItem key={content.contentId || index}>
                <PosterContainer>
                  <PosterCard src={content.poster} title={content.title} />
                </PosterContainer>
              </PosterItem>
            ))
          )
        ) : (
          <>보관함이 비어있어요</>
        )}
      </ContentGrid>
    </ContentBoxContainer>
  );
};

export default ContentBox;
