import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Profile from "../components/Profile";
import ContentBox from "../components/ContentBox";
import { ottList } from "../components/OttButtonList";

// OTT 이름만 뽑아서 배열로
const allOttNames = ottList.map((ott) => ott.alt);

const PersonDetailPage = () => {
  const { personId } = useParams();
  const [personData, setPersonData] = useState(null);

  // 1️⃣ activeTab 상태 추가
  const [activeTab, setActiveTab] = useState("actor");
  // OTT 필터 상태
  const [selectedOtts, setSelectedOtts] = useState(allOttNames);

  // 무한 스크롤용 ref
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  // person 정보 fetch
  useEffect(() => {
    if (!personId) return;
    axios
      .get(`http://localhost:8090/person/${personId}`, {
        params: { otts: selectedOtts.join(","), page: 0 },
        withCredentials: true,
      })
      .then(({ data }) => setPersonData(data))
      .catch(console.error);
  }, [personId, selectedOtts]);

  // 2️⃣ 탭 클릭 핸들러
  const handleTabClick = (value) => {
    // Radix UI 같은 경우 객체로 넘어올 수 있으니 안전하게 처리
    const tabValue =
      typeof value === "object" && value !== null ? value.value : value;
    setActiveTab(tabValue);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
      <Profile
        isMyPage={false}
        image={personData?.image}
        name={personData?.personName}
        firstCount={personData?.filmography?.actor.length ?? 0}
        secondCount={personData?.filmography?.director.length ?? 0}
      />

      <ContentBox
        // OTT 버튼 상태
        selectedOtts={selectedOtts}
        setSelectedOtts={setSelectedOtts}
        // 탭 설정
        tabs={[
          { label: "출연작", value: "actor" },
          { label: "연출작", value: "director" },
        ]}
        defaultTab="actor"
        // 3️⃣ 여기서 value/onTabChange를 넘겨줘야 탭이 바뀝니다
        value={activeTab}
        onTabChange={handleTabClick}
        // 탭에 따라 리스트를 바로 인라인으로 전달
        contentList={personData?.filmography?.[activeTab] ?? []}
        // 무한 스크롤 ref
        scrollContainerRef={scrollContainerRef}
        observerRef={observerRef}
      />
    </div>
  );
};

export default PersonDetailPage;
