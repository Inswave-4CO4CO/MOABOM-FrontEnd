import React, { useEffect, useState } from "react";
import WatchButton from "./WatchButton";
import { Container } from "../styles/components/WatchBox";
import { FaPlus, FaCheck, FaEye } from "react-icons/fa";
import {
  useCreateWatch,
  useDeleteWatch,
  useUpdateWatch,
} from "../hooks/useWatch";

const WatchBox = ({ type, contentId }) => {
  const [activeType, setActiveType] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [prevType, setPrevType] = useState(null);

  const { mutate: createMutate } = useCreateWatch();
  const { mutate: deleteMutate } = useDeleteWatch();
  const { mutate: updateMutate } = useUpdateWatch();

  useEffect(() => {
    if (type) {
      setActiveType(type);
      setIsCreated(true);
    }
  }, [type]);

  const handleClick = (selectedType) => {
    setPrevType(activeType); // 롤백을 위해 이전 값 저장

    if (activeType === selectedType) {
      // 삭제: 낙관적 UI 업데이트
      setActiveType(null);
      setIsCreated(false);

      deleteMutate(contentId, {
        onError: (err) => {
          // 실패 시 롤백
          setActiveType(prevType);
          setIsCreated(true);
          console.error("삭제 실패", err);
        },
      });
    } else if (!isCreated) {
      // 생성: 낙관적 UI 업데이트
      setActiveType(selectedType);
      setIsCreated(true);

      createMutate(
        { contentId, type: selectedType },
        {
          onError: (err) => {
            // 실패 시 롤백
            setActiveType(prevType);
            setIsCreated(false);
            console.error("생성실패", err);
          },
        }
      );
    } else {
      // 수정: 낙관적 UI 업데이트
      setActiveType(selectedType);
      setIsCreated(true);

      updateMutate(
        { contentId, type: selectedType },
        {
          onError: (err) => {
            // 실패 시 롤백
            setActiveType(prevType);
            setIsCreated(true);
            console.error("수정실패", err);
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
