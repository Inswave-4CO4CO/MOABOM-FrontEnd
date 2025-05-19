import { useState } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

const OttButton = ({ imageSrc, imageAlt = '', isSelected = false, onClick, ...props }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(imageAlt);
    }
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
      opacity={isSelected ? 1 : 0.5}
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
