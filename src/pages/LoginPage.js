import {
  Box,
  Button,
  Center,
  Group,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import MoabomLogo from "../assets/svg/모아봄.svg";
import GoogleLogo from "../assets/images/Google.png";
import BodyButton from "../components/BodyButton";
import { PasswordInput } from "../components/ui/password-input";

const LoginContainer = styled(Box)`
  margin-top: 20px;
  border: 1px solid #dcdcdc;
  background-color: #fff8f0;
  border-radius: 24px;
  padding: 48px 36px 24px 36px;
  min-width: 380px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const SocialButton = styled(Button)`
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
    console.log("Logging in with", email, password);
  };

  return (
    <Center>
      <Stack spacing={2}>
        <Center>
          <Image src={MoabomLogo} alt="모아봄" style={{ width: "40%" }} />
        </Center>
        <LoginContainer>
          <VStack spacing={8}>
            <form style={{ width: "100%" }} onSubmit={handleLogin}>
              <VStack spacing={4} align="stretch">
                <Text>아이디</Text>
                <Group attached w="full" maxW="sm">
                  <Input
                    size="lg"
                    style={{ backgroundColor: "white", borderRadius: "10px" }}
                    flex="1"
                    placeholder="아이디"
                  />
                  <BodyButton size="lg">아이디 확인</BodyButton>
                </Group>
                <Text>비밀번호</Text>
                <PasswordInput
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="비밀번호"
                />
                <BodyButton
                  style={{ width: "100%", margin: "10px 0" }}
                  type="submit"
                >
                  로그인
                </BodyButton>
              </VStack>
            </form>

            <HStack w="100%" align="center" color="#949494" spacing={4}>
              <Separator flex="1" borderColor="#e2e2e2" />
              <Text fontSize="sm" flexShrink={0}>
                소셜로그인을 원한다면
              </Text>
              <Separator flex="1" borderColor="#e2e2e2" />
            </HStack>

            <HStack spacing={6}>
              <SocialButton>
                <Image src={GoogleLogo} alt="구글" boxSize="28px" />
              </SocialButton>
            </HStack>

            <HStack spacing={2} color="#949494" fontSize="sm" pt={2}>
              <Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                아이디 찾기
              </Text>
              <Text>|</Text>
              <Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                비밀번호 찾기
              </Text>
              <Text>|</Text>
              <Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                회원가입
              </Text>
            </HStack>
          </VStack>
        </LoginContainer>
      </Stack>
    </Center>
  );
};

export default LoginPage;
