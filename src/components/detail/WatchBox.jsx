import React, { useEffect, useState } from "react";
import WatchButton from "./WatchButton";
import { Container } from "../../styles/components/WatchBox";
import { FaPlus, FaCheck, FaEye } from "react-icons/fa";
import { useWatch } from "../../hooks/useWatch";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";

const WatchBox = ({ type, contentId, genre }) => {
  const [activeType, setActiveType] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [prevType, setPrevType] = useState(null);

  const { createWatchMutate, updateWatchMutate, deleteWatchMutate } =
    useWatch(contentId);

  const { isLogin } = useAuthStore();

  useEffect(() => {
    if (type) {
      setActiveType(type);
      setIsCreated(true);
    }
  }, [type]);

  const handleClick = (selectedType) => {
    setPrevType(activeType); // 롤백을 위해 이전 값 저장
    if (!isLogin) {
      toast.warn("로그인이 필요합니다.");
      return;
    }

    if (activeType === selectedType) {
      // 삭제: 낙관적 UI 업데이트
      setActiveType(null);
      setIsCreated(false);
      console.log(genre);
      deleteWatchMutate(
        { contentId, type: selectedType, genre },
        {
          onError: (err) => {
            // 실패 시 롤백
            setActiveType(prevType);
            setIsCreated(true);
            toast.error("삭제 실패", err);
          },
        }
      );
    } else if (!isCreated) {
      // 생성: 낙관적 UI 업데이트
      setActiveType(selectedType);
      setIsCreated(true);

      createWatchMutate(
        { contentId, type: selectedType, genre },
        {
          onError: (err) => {
            // 실패 시 롤백
            setActiveType(prevType);
            setIsCreated(false);
            toast.error("생성실패", err);
          },
        }
      );
    } else {
      // 수정: 낙관적 UI 업데이트
      setActiveType(selectedType);
      setIsCreated(true);

      updateWatchMutate(
        { contentId, type: selectedType, genre },
        {
          onError: (err) => {
            // 실패 시 롤백
            setActiveType(prevType);
            setIsCreated(true);
            toast.error("수정실패", err);
          },
        }
      );
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
