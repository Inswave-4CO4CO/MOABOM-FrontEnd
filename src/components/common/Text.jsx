import {
  CountSpan,
  TextContainer,
  TextSpan,
} from "../../styles/components/Text";

//텍스트
const Text = ({ text, count }) => {
  return (
    <TextContainer>
      <TextSpan>{text}</TextSpan>
      {count ? <CountSpan> ({count}개)</CountSpan> : <></>}
    </TextContainer>
  );
};

export default Text;
