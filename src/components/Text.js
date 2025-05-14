import { CountSpan, TextContainer, TextSpan } from "../styles/components/Text";

export const Text = ({ text, count }) => {
  return (
    <TextContainer>
      <TextSpan>{text}</TextSpan>
      <CountSpan> ({count}개)</CountSpan>
    </TextContainer>
  );
};
