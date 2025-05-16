import { Group, Input } from "@chakra-ui/react";
import BodyButton from "./BodyButton";

const InputBtnGroup = ({ children, handleClick, ...props }) => {
  return (
    <Group attached w="full" maxW="sm">
      <Input
        size="lg"
        style={{ backgroundColor: "white", borderRadius: "10px" }}
        flex="1"
        {...props}
      />
      <BodyButton size="lg" onClick={handleClick}>
        {children}
      </BodyButton>
    </Group>
  );
};

export default InputBtnGroup;
