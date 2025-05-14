import { Button as ChakraButton } from '@chakra-ui/react';

const HeaderButton = ({ children, ...props }) => {
  return (
    <ChakraButton
      variant="outline"
      borderColor="#727272"
      color="#727272"
      borderRadius="10px"
      _hover={{ bg: '#FFA07A', borderColor: '#FFA07A', color: '#FFFFFF' }}
      _active={{ bg: '#FFA07A', borderColor: '#FFA07A', color: '#FFFFFF' }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default HeaderButton;