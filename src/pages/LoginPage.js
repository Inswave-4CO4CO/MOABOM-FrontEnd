import {
  AbsoluteCenter,
  Button,
  Card,
  Center,
  Field,
  Group,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import HeaderButton from "../components/HeaderButton";
import { PasswordInput } from "../components/ui/password-input";
import styled from "styled-components";
import MoabomLogo from "../assets/svg/모아봄.svg";

const LoginContainer = styled(Stack)`
  border: 1px solid #dcdcdc;
  background-color: #fff8f0;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log("Logging in with", email, password);
  };

  return (
    <>
      <Stack gap="10">
        <Center>
          <Image src={MoabomLogo} style={{ width: "10%" }} />
        </Center>
        <Center>
          <LoginContainer>
            <form>
              <Stack gap="4" align="flex-start" maxW="sm">
                <Text>아이디</Text>
                <Group attached w="full" maxW="sm">
                  <Input color="white" flex="1" placeholder="아이디" />
                  <Button bg="bg.subtle" variant="outline">
                    아이디 확인
                  </Button>
                </Group>
                <Text>비밀번호</Text>
                <PasswordInput placeholder="비밀번호" />
                <HeaderButton style={{ width: "100%" }} type="submit">
                  로그인
                </HeaderButton>
              </Stack>
            </form>
            <HStack>
              <Separator flex="1" />
              <Text flexShrink="0">소셜 로그인을 원한다면</Text>
              <Separator flex="1" />
            </HStack>
            <HeaderButton>구글로 로그인</HeaderButton>
          </LoginContainer>
        </Center>
      </Stack>
    </>
  );
};

export default LoginPage;
