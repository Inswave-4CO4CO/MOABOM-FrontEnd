import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .title {
    align-self: flex-start;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .select {
    align-self: flex-end;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 500px;
  margin: 0 auto;
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
