import { Center, Image } from "@chakra-ui/react";
import MoabomLogo from "../../assets/moabom.svg";
import { useNavigate } from "react-router-dom";

const Logo = ({ w = "40%" }) => {
  const navigate = useNavigate();

  return (
    <Center style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
      <Image src={MoabomLogo} alt="모아봄" style={{ width: `${w}` }} />
    </Center>
  );
};

export default Logo;
