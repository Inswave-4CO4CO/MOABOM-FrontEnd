import {
  Center,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import MoabomLogo from "../assets/svg/모아봄.svg";
import GoogleLogo from "../assets/images/Google.png";
import BodyButton from "../components/BodyButton";
import { PasswordInput } from "../components/ui/password-input";
import { useNavigate } from "react-router-dom";
import { LoginContainer, SocialButton } from "../styles/pages/LoginPage";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
    console.log("Logging in with", userId, password);
  };

  const navigate = useNavigate();

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
                <Input
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="아이디"
                />
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
              <Text
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
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
