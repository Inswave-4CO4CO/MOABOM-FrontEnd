import Chart from "../components/chart";
import styled from "styled-components";
import Profile from "../components/Profile";
import Tving from "../assets/images/Tving.png";
import { useEffect, useState } from "react";
import { getMyReviewList, getMyWatchCount } from "../services/myPageService";

const MyPage = () => {
  const [watchCount, setWatchCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewList, setReviewList] = useState("");
  const [reviewPage, setReviewPage] = useState(0);

  //나의 한줄평 가져오기
  const getReviewList = () => {
    getMyReviewList(reviewPage + 1).then((res) => {
      setReviewPage(reviewPage + 1);
      setReviewList(res.data.content);
      setReviewCount(res.data.totalCount);
    });
  };

  useEffect(() => {
    //보관함 개수 (봤다 + 보는중)
    getMyWatchCount().then((res) => setWatchCount(res.data.count));

    //나의 한줄평 가져오기
    getReviewList();
  }, []);

  return (
    <PageWrapper>
      <Container>
        <div className="leftGroup">
          <Profile
            image={Tving}
            isMyPage={true}
            firstCount={watchCount}
            secondCount={reviewCount}
          />
        </div>
        <div className="rightGroup">
          <div className="chartBox">
            <Chart />
          </div>
          <div className="reviewBox">
            <Chart />
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  width: 100%;

  .leftGroup {
    width: 25%;
    height: 90vh;
    position: sticky;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
  }

  .rightGroup {
    width: 75%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chartBox {
    display: flex;
    height: 90vh;
    align-items: center;
    justify-content: center;
  }

  .reviewBox {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
`;
