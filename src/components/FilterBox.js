import { Box } from '@chakra-ui/react';

const FilterBox = ({ children, ...props }) => {
  return (
    <Box
      bg="#FFA07A"
      border="1px solid #FFA07A"
      color="#FFFFFF"
      borderRadius="38px"
      px="10px" 
      py="4px"   
      fontSize="12px"
      fontWeight="bold"
      display="inline-block"
      textAlign="center"
      {...props}
    >
      {children}
    </Box>
  );
};

export default FilterBox;