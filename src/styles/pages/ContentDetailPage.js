import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  /* overflow-y: auto;
  min-height: 100vh; */
`;
export const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 24px 150px;

  @media (max-width: 1400px) {
    padding: 24px 70px;
  }
  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const ContentDetail = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ContentDescription = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16px;
  color: #333;

  p {
    font-weight: bold;
    margin: 8px 0 4px;
  }

  span {
    line-height: 1.6;
  }

  a {
    display: inline-block;
    margin-right: 8px;
  }
`;

export const OttGroup = styled.div`
  display: flex;
  margin-left: 5px;
  gap: 17px;
`;

export const WatchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ContentCastAndCrew = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const ReviewGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const Reviews = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
`;

export const ReviewTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 15px;
  width: 100%;
  height: 200px;
  font-size: medium;
  border: 1px solid #dcdcdc;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const ReviewRating = styled.div`
  display: flex;
`;

export const AddButton = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;
