import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;

  .leftGroup {
    width: 25%;
    height: 90vh;
    position: sticky;
    display: flex;
    justify-content: center;
    top: 130px;
  }

  .rightGroup {
    width: 75%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chartBox {
    display: flex;
    height: 100vh;
    background-color: pink;
    justify-content: center;
  }

  .reviewBox {
    display: flex;
    height: 100vh;
    justify-content: center;
  }
`;
