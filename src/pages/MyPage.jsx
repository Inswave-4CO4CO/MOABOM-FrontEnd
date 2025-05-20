import Chart from "../components/chart";
import styled from "styled-components";

const MyPage = () => {
  return (
    <Container>
      <div className="leftGroup">ss</div>
      <div className="rightGroup">
        <div className="chartBox">
          <Chart />
        </div>
        <div className="reviewBox">ddd</div>
      </div>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  width: 100%;
  height: 200vh;
  position: sticky;
  display: flex;
  background-color: orange;
  overflow-y: hidden;

  .leftGroup {
    width: 30%;
    height: 100px;

    top: 100px;
    position: -webkit-sticky;
    background-color: yellow;
  }
  .rightGroup {
    width: 70%;
    height: 100vh;
  }
  .rightGroup {
    width: 70%;
    height: 100vh;
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
