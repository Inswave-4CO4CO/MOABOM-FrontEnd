import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1400px;
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

  .leftGroup {
    width: 20%;
    height: 80vh;
    position: sticky;
    display: flex;
    justify-content: center;
    top: 130px;
  }

  .rightGroup {
    width: 80%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chartBox {
    display: flex;
    height: 86vh;
    justify-content: center;
  }

  .reviewBox {
    display: flex;
    height: 86vh;
    justify-content: center;
  }
`;
