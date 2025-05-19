import styled from "styled-components";

export const ReviewContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 15px;
  padding: 10px;
  background-color: #fff8f0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ReviewHeader = styled.div`
  display: flex;
  min-height: 50px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: -5px;
  gap: 5px;
`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export const DefaultImage = styled.div`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #dcdcdc;
`;

export const DateSpan = styled.span`
  font-size: small;
  color: #727272;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`;

export const ReviewText = styled.div`
  flex-grow: 7;
  padding: 10px 0 10px 13px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ReviewFooter = styled.div`
  display: flex;
  min-height: 40px;
  padding-top: 10px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const RightGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Icon = styled.div`
  cursor: pointer;

  svg {
    color: #d9d9d9;
    transition: color 0.2s;
  }

  &:hover svg {
    color: #727272;
  }
`;
