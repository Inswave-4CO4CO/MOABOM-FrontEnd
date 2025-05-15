import { Button as ChakraButton } from '@chakra-ui/react';

const HeaderButton = ({ children, ...props }) => {
  return (
    <ChakraButton
      variant="outline"
      borderColor="#727272"
      color="#727272"
      borderRadius="10px"
      _hover={{ bg: '#FF9266', borderColor: '#FF9266', color: '#FFFFFF' }}
      _active={{ bg: '#FF9266', borderColor: '#FF9266', color: '#FFFFFF' }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default HeaderButton;