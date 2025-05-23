import styled from "styled-components";

export const ProfileWrapper = styled.div`
  position: fixed;
  top: 130px;
  left: 10%;
  width: 300px;

  .buttonBox {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 16px;
  }
`;

export const ContentWrapper = styled.div`
  margin-left: 340px;
  /* 스크롤 컨테이너 역할 */
`;

export const Container = styled.div`
  margin: 40px 0;
`;
