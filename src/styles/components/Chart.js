import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
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
    min-height: 20px;
    width: 100%;
  }

  .select {
    align-self: flex-end;
    min-height: 20px;
    width: 150px;
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
  display: flex;
  align-items: center;
`;
