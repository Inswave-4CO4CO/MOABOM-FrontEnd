import styled from "styled-components";

export const Text = ({ text, count }) => {
  return (
    <TextContainer>
      <TextSpan>{text}</TextSpan>
      <CountSpan> ({count}개)</CountSpan>
    </TextContainer>
  );
};

const TextContainer = styled.div`
  font-weight: bold;
`;
const TextSpan = styled.span`
  font-size: 20px;
`;
const CountSpan = styled.span`
  color: #ffa07a;
  position: relative;
  bottom: 0.2em;
`;
