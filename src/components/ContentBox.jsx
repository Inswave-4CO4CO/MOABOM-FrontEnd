import React, { useState } from "react";
import OttButtonList, { ottList } from "./OttButtonList";
import TabComponent from "./Tab";
import PosterCard from "./PosterCard";
import {
  ContentBoxContainer,
  ContentBoxHeader,
  ContentBoxTitle,
  OttButtonContainer,
  ContentGrid,
  PosterItem,
  PosterContainer,
} from "../styles/components/ContentBox";

const ContentBox = ({ contentList = [], title, tabs, defaultTab }) => {
  const [selectedOtts, setSelectedOtts] = useState([
    ...ottList.map((ott) => ott.alt),
  ]);
  const [activeTab, setActiveTab] = useState(defaultTab);

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
  };

  return (
    <ContentBoxContainer>
      <ContentBoxHeader>
        <ContentBoxTitle>{title}</ContentBoxTitle>

        <OttButtonContainer>
          <OttButtonList
            selectedOtts={selectedOtts}
            onToggleOtt={handleOttSelect}
          />
        </OttButtonContainer>

        <TabComponent list={tabs} onTabChange={handleTabChange} />
      </ContentBoxHeader>

      <ContentGrid>
        {contentList &&
          contentList.map((content, index) => (
            <PosterItem key={content.contentId || index}>
              <PosterContainer>
                <PosterCard src={content.poster} title={content.title} />
              </PosterContainer>
            </PosterItem>
          ))}
      </ContentGrid>
    </ContentBoxContainer>
  );
};

export default ContentBox;
