import { Button as ChakraButton } from '@chakra-ui/react';

const BodyButton = ({ children, ...props }) => {
  return (
    <ChakraButton
      variant="solid"
      bg="#FF9266"
      borderColor="#FF9266"
      color="#FFFFFF"
      borderRadius="10px"
      fontSize="lg"
      _hover={{
        bg: "#ff7f50",
        borderColor: "#ff7f50",
        color: "#FFFFFF"
      }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default BodyButton;
