import { Center, Image } from "@chakra-ui/react";
import MoabomLogo from "../assets/svg/moabom.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <Center style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
      <Image src={MoabomLogo} alt="모아봄" style={{ width: "40%" }} />
    </Center>
  );
};

export default Logo;
