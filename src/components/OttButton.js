import { useState } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const OttButton = ({ imageSrc, imageAlt = '', ...props }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <ChakraButton
      p="0"
      border="none"
      bg="transparent"
      _hover={{ opacity: 0.8 }}
      borderRadius="10px"
      overflow="hidden"
      w="40px"
      h="40px"
      minW="unset"
      opacity={isSelected ? 0.5 : 1}
      onClick={handleClick}
      {...props}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      )}
    </ChakraButton>
  );
};

export default OttButton;
