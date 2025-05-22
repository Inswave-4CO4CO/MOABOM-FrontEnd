import {
  Center,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import GoogleLogo from "../assets/images/Google.png";
import BodyButton from "../components/BodyButton";
import { LoginContainer, SocialButton } from "../styles/pages/LoginPage";
import Logo from "../components/Logo";
import { useLogin } from "../hooks/useLogin";
import LinkText from "../components/LinkText";
import LabelInput from "../components/LabelInput";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ userId, password });
  };

  return (
    <Center style={{ marginTop: "100px" }}>
      <Stack spacing={2}>
        <Logo />
        <LoginContainer>
          <VStack spacing={8}>
            <form style={{ width: "100%" }} onSubmit={handleLogin}>
              <VStack spacing={4} align="stretch">
                <LabelInput
                  label="아이디"
                  onChange={(e) => setUserId(e.target.value)}
                />
                <LabelInput
                  label="비밀번호"
                  isPassword={true}
                  onChange={(e) => setPassword(e.target.value)}
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
                소셜 로그인을 원한다면
              </Text>
              <Separator flex="1" borderColor="#e2e2e2" />
            </HStack>
            <HStack spacing={6}>
              <SocialButton
                onClick={() => {
                  window.location.href =
                    "http://localhost:8090/oauth2/authorization/google";
                }}
              >
                <Image src={GoogleLogo} alt="구글" boxSize="28px" />
              </SocialButton>
            </HStack>

            <HStack spacing={2} color="#949494" fontSize="sm" pt={2}>
              <LinkText text="아이디 찾기" />
              <Text>|</Text>
              <LinkText text="비밀번호 찾기" />
              <Text>|</Text>
              <LinkText text="회원가입" link="/signup" />
            </HStack>
          </VStack>
        </LoginContainer>
      </Stack>
    </Center>
  );
};

export default LoginPage;
