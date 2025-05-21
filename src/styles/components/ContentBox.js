import styled from "styled-components";

// 스타일드 컴포넌트로 분리
export const ContentBoxContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const ContentBoxHeader = styled.div`
  padding: 16px;
`;

export const ContentBoxTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 20px;
`;

export const OttButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: flex-start;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 8px 24px;

  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const PosterItem = styled.div`
  width: 100%;
  max-width: 170px;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const PosterContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
