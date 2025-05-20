import styled from "styled-components";
import { FaStar } from "react-icons/fa6";

const RateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 1.2em;
`;

const RateImage = styled.img`
  height: 100%;
  width: auto;
`;

const StyledFaStar = styled(FaStar)`
  height: 100%;
  width: auto;
  color: #ff9266;
`;

export { RateContainer, IconContainer, RateImage, StyledFaStar };
