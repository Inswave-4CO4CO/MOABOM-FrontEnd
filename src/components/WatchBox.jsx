import React, { useEffect, useState } from "react";
import WatchButton from "./WatchButton";
import { Container } from "../styles/components/WatchBox";

//시청버튼 박스
const WatchBox = ({ type }) => {
  const [want, SetWant] = useState(false);
  const [ing, SetIng] = useState(false);
  const [ed, SetEd] = useState(false);

  useEffect(() => {
    activateType(type);
  }, []);

  const activateType = (selectedType, currentState) => {
    if (currentState) {
      SetWant(false);
      SetIng(false);
      SetEd(false);
    } else {
      SetWant(selectedType === "WANT");
      SetIng(selectedType === "ING");
      SetEd(selectedType === "ED");
    }
  };

  return (
    <Container>
      <WatchButton
        isEnable={want}
        type="WANT"
        onClick={() => activateType("WANT", want)}
      />
      <WatchButton
        isEnable={ing}
        type="ING"
        onClick={() => activateType("ING", ing)}
      />
      <WatchButton
        isEnable={ed}
        type="ED"
        onClick={() => activateType("ED", ed)}
      />
    </Container>
  );
};

export default WatchBox;
