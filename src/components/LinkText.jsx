import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LinkText = ({ text, link = "#" }) => {
  const navigate = useNavigate();

  return (
    <Text
      _hover={{ textDecoration: "underline", cursor: "pointer" }}
      onClick={() => navigate(link)}
    >
      {text}
    </Text>
  );
};

export default LinkText;
