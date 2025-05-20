import React, { useState } from "react";
import { Box, Flex, Stack, Text, Center, Grid } from "@chakra-ui/react";
import OttButtonList, { ottList } from "./OttButtonList";
import TabComponent from "./Tab";
import PosterCard from "./PosterCard";

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
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
      width="100%"
      maxWidth="1000px"
      margin="0 auto"
      bg="white"
      boxShadow="sm"
    >
      <Box p={4}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={4}
          marginTop={4}
          marginBottom={5}
        >
          {title}
        </Text>

        <Flex wrap="wrap" gap={2} mb={4} justifyContent="flex-start">
          <OttButtonList
            selectedOtts={selectedOtts}
            onToggleOtt={handleOttSelect}
          />
        </Flex>

        <TabComponent list={tabs} onTabChange={handleTabChange} />
      </Box>

      <Box py={2} px={6}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
          justifyItems="center"
        >
          {contentList &&
            contentList.map((content, index) => (
              <Box
                key={content.contentId || index}
                width="100%"
                maxWidth="170px"
                mb={6}
                cursor="pointer"
              >
                <Stack spacing={2} align="center">
                  <Box width="100%" height="auto" position="relative">
                    <PosterCard src={content.poster} title="" />
                  </Box>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    textAlign="center"
                    noOfLines={1}
                  >
                    {content.title}
                  </Text>
                </Stack>
              </Box>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ContentBox;
