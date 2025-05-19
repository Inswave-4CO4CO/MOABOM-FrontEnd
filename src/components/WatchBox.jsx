import React, { useEffect, useState } from "react";
import WatchButton from "./WatchButton";
import { Container } from "../styles/components/WatchBox";
import { FaPlus, FaCheck, FaEye } from "react-icons/fa";
import {
  createWatch,
  deleteWatch,
  modifyWatch,
} from "../services/watchService";

const WatchBox = ({ type, userId, contentId }) => {
  const [activeType, setActiveType] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (type) {
      setActiveType(type);
      setIsCreated(true);
    }
  }, [type]);

  const handleClick = (selectedType) => {
    if (activeType === selectedType) {
      // 같은 버튼 누르면 삭제
      deleteWatch(contentId, userId)
        .then(() => {
          setActiveType(null);
          setIsCreated(false);
        })
        .catch((err) => console.error("삭제 실패", err));
    } else if (!isCreated) {
      // 아직 생성되지 않았으면 생성
      createWatch(contentId, userId, selectedType)
        .then(() => {
          setActiveType(selectedType);
          setIsCreated(true);
        })
        .catch((err) => console.error("생성 실패", err));
    } else {
      // 이미 생성된 경우면 수정
      modifyWatch(contentId, userId, selectedType)
        .then(() => setActiveType(selectedType))
        .catch((err) => console.error("수정 실패", err));
    }
  };

  return (
    <Container>
      <WatchButton
        icon={<FaPlus size={40} />}
        text="보고싶다"
        isEnable={activeType === "WANT"}
        onClick={() => handleClick("WANT")}
      />
      <WatchButton
        icon={<FaEye size={40} />}
        text="보는중"
        isEnable={activeType === "ING"}
        onClick={() => handleClick("ING")}
      />
      <WatchButton
        icon={<FaCheck size={40} />}
        text="봤다"
        isEnable={activeType === "ED"}
        onClick={() => handleClick("ED")}
      />
    </Container>
  );
};

export default WatchBox;
