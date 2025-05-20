import React from "react";
import Chart from "../components/chart";
import styled from "styled-components";

const MyPage = () => {
  return (
    <Container>
      <div className="leftGroup">ss</div>
      <div className="rightGroup">
        <div className="chartBox">dd</div>
        <div className="reviewBox">ddd</div>
      </div>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  background-color: orange;

  .leftGroup {
    width: 30%;
    height: 100%;
    position: sticky;
    background-color: yellow;
  }
  .rightGroup {
    width: 70%;
    height: 100%;
  }
  .rightGroup {
    width: 70%;
    height: 100%;
  }
  .chartBox {
    height: 100%;
    background-color: pink;
  }
  .reviewBox {
    height: 100%;
    background-color: green;
  }
`;
