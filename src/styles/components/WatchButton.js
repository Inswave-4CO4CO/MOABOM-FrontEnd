import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .icon svg {
    color: ${({ enable }) => (enable ? "#ff9266" : "black")};
    transition: color 0.2s;
  }

  &:hover svg,
  &:hover p {
    color: #727272;
    transition: color 0.2s;
  }
`;

export const ButtonPtag = styled.p`
  font-size: small;
  font-weight: 500;
`;
