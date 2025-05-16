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
import MoabomLogo from "../assets/svg/moabom.svg";
import BodyButton from "../components/BodyButton";
import { LoginContainer } from "../styles/pages/LoginPage";
import { PasswordInput } from "../components/PasswordInput";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      if (data) {
        // todo: token 저장 로직
        navigate("/login");
      }
      console.log(data);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate({ userId, password, nickname });
    console.log("Signup in with", userId, password, passwordConfirm, nickname);
  };

  return (
    <Center>
      <Stack spacing={2}>
        <Center>
          <Image src={MoabomLogo} alt="모아봄" style={{ width: "40%" }} />
        </Center>
        <LoginContainer>
          <VStack spacing={8}>
            <form style={{ width: "100%" }} onSubmit={handleSignup}>
              <VStack spacing={4} align="stretch">
                <Text>아이디</Text>
                <Group attached w="full" maxW="sm">
                  <Input
                    size="lg"
                    style={{ backgroundColor: "white", borderRadius: "10px" }}
                    flex="1"
                    placeholder="아이디"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <BodyButton size="lg">아이디 확인</BodyButton>
                </Group>
                <Text>비밀번호</Text>
                <PasswordInput
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="비밀번호"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Text>비밀번호 확인</Text>
                <PasswordInput
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="비밀번호 확인"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <Text>닉네임</Text>
                <Input
                  size="lg"
                  style={{ backgroundColor: "white", borderRadius: "10px" }}
                  placeholder="닉네임"
                  onChange={(e) => setNickname(e.target.value)}
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
