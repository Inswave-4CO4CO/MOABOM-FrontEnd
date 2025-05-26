import styled, { keyframes } from "styled-components";

// 스타일드 컴포넌트로 분리
export const ContentBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdcdc;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const ContentBoxHeader = styled.div`
  padding: 16px 28px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
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
  grid-template-columns: ${({ $isReview }) =>
    $isReview ? "repeat(1, 1fr)" : "repeat(2, 1fr)"};
  gap: 10px;
  padding: 8px 16px;
  overflow-y: auto;
  min-height: 250px;
  width: 100%;
  place-items: center;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  @media (min-width: 400px) {
    grid-template-columns: ${({ $isReview }) =>
      $isReview ? "repeat(1, 1fr)" : "repeat(1, 1fr)"};
  }

  @media (min-width: 714px) {
    grid-template-columns: ${({ $isReview }) =>
      $isReview ? "repeat(2, 1fr)" : "repeat(2, 1fr)"};
  }

  @media (min-width: 1000px) {
    grid-template-columns: ${({ $isReview }) =>
      $isReview ? "repeat(3, 1fr)" : "repeat(3, 1fr)"};
  }

  @media (min-width: 1200px) {
    grid-template-columns: ${({ $isReview }) =>
      $isReview ? "repeat(3, 1fr)" : "repeat(4, 1fr)"};
  }
`;

export const PosterItem = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const PosterContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

export const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(-10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
`;

export const DynamicMessage = styled.p`
  text-align: center;
  margin-top: 100px;
  animation: ${fadeIn} 1s ease-in-out;
  font-size: 1.2rem;
  margin-top: 200px;
  color: #777;
`;
