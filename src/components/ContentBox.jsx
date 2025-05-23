import React, { useEffect, useState } from "react";
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
  observerRef,
  isReview = false,
  userReview,
  onDeleteReview,
  onModifyReview,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
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

  const handleTabChange = (value) => {
    setActiveTab(value);
    onTabChange(value);
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
        <TabComponent list={tabs} value={value} onTabChange={onTabChange} />
      </ContentBoxHeader>

      <ContentGrid
        className="content-scroll-area"
        ref={scrollContainerRef}
        $isReview={isReview}
      >
        {isReview
          ? contentList.map((value) => (
              <Review
                reviewId={value.reviewId}
                key={value.reviewId}
                rating={value.rating}
                date={value.createdAt}
                text={value.reviewText}
                nickname={value.userId}
                isUser={true}
                title={value.title}
                handleModify={onModifyReview}
                handleDelete={onDeleteReview}
              />
            ))
          : contentList.map((content, index) => {
              const itemKey = content.contentId || `item-${index}`;
              return (
                <PosterItem key={itemKey}>
                  <PosterContainer>
                    <PosterCard
                      src={content.poster}
                      title={content.title}
                      onClick={() => {
                        console.log(1);
                        navigate(`/detail/${content.contentId}`);
                      }}
                    />
                  </PosterContainer>
                </PosterItem>
              );
            })}
        <div ref={observerRef} style={{ height: "1px" }} />
      </ContentGrid>
    </ContentBoxContainer>
  );
};

export default ContentBox;
