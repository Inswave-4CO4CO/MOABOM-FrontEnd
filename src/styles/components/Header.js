import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 0.8fr 3fr 1fr;
  align-items: center;
  height: 90px;
  border-bottom: 1px solid #dcdcdc;
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
`;

export const InputBtnGroupContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonWrapContainer = styled.div`
  padding-right: 60px;
`;

export const FloatContainer = styled.div`
  float: right;
`;
