import { Button as ChakraButton } from "@chakra-ui/react";

const OttButton = ({
  imageSrc,
  imageAlt = "",
  isSelected = false,
  onClick,
  ...props
}) => {
  return (
    <ChakraButton
      p="0"
      border="none"
      bg="transparent"
      _hover={{ opacity: 0.5 }}
      borderRadius="10px"
      overflow="hidden"
      w="40px"
      h="40px"
      minW="unset"
      opacity={isSelected ? 1 : 0.2}
      onClick={onClick}
      {...props}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
          }}
        />
      )}
    </ChakraButton>
  );
};

export default OttButton;
