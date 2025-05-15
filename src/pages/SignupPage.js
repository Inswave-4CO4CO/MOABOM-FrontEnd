import {
  Center,
  Group,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import MoabomLogo from "../assets/svg/모아봄.svg";
import BodyButton from "../components/BodyButton";
import { PasswordInput } from "../components/ui/password-input";
import { LoginContainer } from "../styles/pages/LoginPage";

const SignupPage = () => {
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
                <Text>비밀번호 확인</Text>
                <PasswordInput
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="비밀번호 확인"
                />
                <Text>닉네임</Text>
                <Input
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="닉네임"
                />
                <BodyButton
                  style={{ width: "100%", margin: "10px 0" }}
                  type="submit"
                >
                  회원가입
                </BodyButton>
              </VStack>
            </form>
          </VStack>
        </LoginContainer>
      </Stack>
    </Center>
  );
};

export default SignupPage;
