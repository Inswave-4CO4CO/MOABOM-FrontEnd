// src/pages/PersonDetailPage.jsx

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Profile from "../components/Profile";
import ContentBox from "../components/ContentBox";
import { ottList } from "../components/OttButtonList";

const allOttNames = ottList.map((ott) => ott.alt);

const PersonDetailPage = () => {
  const { personId } = useParams();

  // 원본 데이터
  const [personData, setPersonData] = useState(null);
  // 필터 적용된 데이터
  const [filteredData, setFilteredData] = useState(null);

  // 탭, OTT 필터
  const [activeTab, setActiveTab] = useState("actor");
  const [selectedOtts, setSelectedOtts] = useState(allOttNames);

  // 무한 스크롤 refs
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  // ─────────────────────────────────────────────────────────
  // 최초 응답에서만 counts 를 저장할 ref
  const initialActorCount = useRef(0);
  const initialDirectorCount = useRef(0);

  // 1) 최초 personData fetch
  useEffect(() => {
    if (!personId) return;
    axios
      .get(`http://localhost:8090/person/${personId}`, {
        params: { otts: allOttNames.join(","), page: 0 },
        withCredentials: true,
      })
      .then(({ data }) => {
        setPersonData(data);
        setFilteredData(data);

        // ref 가 아직 0 이면 (아직 초기화 안 된 상태)
        if (
          initialActorCount.current === 0 &&
          data.filmography.actor.length > 0
        ) {
          initialActorCount.current = data.filmography.actor.length;
        }
        if (
          initialDirectorCount.current === 0 &&
          data.filmography.director.length > 0
        ) {
          initialDirectorCount.current = data.filmography.director.length;
        }
      })
      .catch(console.error);
  }, [personId]);

  // 2) OTT 필터 변경 시에는 filteredData 만 다시 fetch
  useEffect(() => {
    if (!personData) return;
    axios
      .get(`http://localhost:8090/person/${personId}`, {
        params: { otts: selectedOtts.join(","), page: 0 },
        withCredentials: true,
      })
      .then(({ data }) => {
        setFilteredData(data);
      })
      .catch(console.error);
  }, [personId, selectedOtts, personData]);

  // 3) 탭 클릭 핸들러
  const handleTabClick = (value) => {
    const tabValue = typeof value === "object" ? value.value : value;
    setActiveTab(tabValue);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
      <Profile
        isMyPage={false}
        image={personData?.image}
        name={personData?.personName}
        // ref.current 에 저장된 최초 값만 넘겨줌
        firstCount={initialActorCount.current}
        secondCount={initialDirectorCount.current}
      />

      <ContentBox
        selectedOtts={selectedOtts}
        setSelectedOtts={setSelectedOtts}
        tabs={[
          { label: "출연작", value: "actor" },
          { label: "연출작", value: "director" },
        ]}
        defaultTab="actor"
        value={activeTab}
        onTabChange={handleTabClick}
        // 이후 필터링에도 바뀌는 건 filteredData 뿐
        contentList={filteredData?.filmography?.[activeTab] ?? []}
        scrollContainerRef={scrollContainerRef}
        observerRef={observerRef}
      />
    </div>
  );
};

export default PersonDetailPage;
