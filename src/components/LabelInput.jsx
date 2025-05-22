import { Input, Text } from "@chakra-ui/react";
import { PasswordInput } from "./PasswordInput";
const LabelInput = ({ label, isPassword = false, ...props }) => {
  return (
    <div>
      <Text>{label}</Text>
      {isPassword ? (
        <PasswordInput
          size="lg"
          style={{ backgroundColor: "white", borderRadius: "10px" }}
          placeholder={label}
          {...props}
        />
      ) : (
        <Input
          size="lg"
          style={{ backgroundColor: "white", borderRadius: "10px" }}
          placeholder={label}
          {...props}
        />
      )}
    </div>
  );
};

export default LabelInput;
