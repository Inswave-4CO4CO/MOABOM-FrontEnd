import { ButtonPtag, Container } from "../../styles/components/WatchButton";
import { RiPencilFill } from "react-icons/ri";

const WatchButton = ({
  icon = <RiPencilFill size={40} />,
  text = "한줄평",
  isEnable,
  onClick,
}) => {
  return (
    <Container enable={isEnable} onClick={onClick}>
      <div className="icon">{icon}</div>
      <ButtonPtag>{text}</ButtonPtag>
    </Container>
  );
};

export default WatchButton;
