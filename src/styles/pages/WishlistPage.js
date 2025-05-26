import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const Layout = styled.div`
  position: relative;
  display: flex;
  background-color: #fff8f0;
  border-radius: 16px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 1200px;
`;

export const LeftWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h4`
  font-size: 32px;
  font-weight: bold;
`;

export const LeftPanel = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
`;

export const ContentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RightPanel = styled.div`
  position: fixed;
  top: 220px;
  right: calc(50% - 580px + 20px);
  width: 260px;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

export const SelectedList = styled.div`
  font-size: 14px;
  margin: 16px 0;
  color: #333;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
