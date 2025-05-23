import styled, { keyframes } from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  gap: 30px;
`;

export const LeftGroupContainer = styled.div`
  width: 30%;
  height: 80vh;
  position: sticky;
  display: flex;
  justify-content: center;
  top: 130px;
`;

export const RigthGroupContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
