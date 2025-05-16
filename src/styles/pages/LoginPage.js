import { Box, Button } from "@chakra-ui/react";
import styled from "styled-components";

export const LoginContainer = styled(Box)`
  margin-top: 20px;
  border: 1px solid #dcdcdc;
  background-color: #fff8f0;
  border-radius: 24px;
  padding: 48px 36px 24px 36px;
  min-width: 380px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

export const SocialButton = styled(Button)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  padding: 0;
  box-shadow: none;
  &:hover {
    background: #f5f5f5;
  }
`;
