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
import { checkId, signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickName, setNickName] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("회원가입 성공!");
      navigate("/login");
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || "문제가 발생했습니다.");
    },
  });

  const { mutate: userIdCheck } = useMutation({
    mutationFn: checkId,
    onSuccess: (data) => {
      if (data.available) {
        toast.success("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else {
        toast.warn("이미 사용 중인 아이디입니다.");
        setIsIdChecked(false);
      }
    },
    onError: () => {
      toast.error("아이디 확인 실패");
      setIsIdChecked(false);
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(password, passwordConfirm);
    if (password !== passwordConfirm) {
      toast.warn("비밀번호가 일치하지 않습니다");
      return;
    }
    if (!isIdChecked) {
      toast.warn("아이디 중복 확인을 해주세요.");
      return;
    }
    mutate({ userId, password, nickName });
    console.log("Signup in with", userId, password, passwordConfirm, nickName);
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
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setIsIdChecked(false);
                    }}
                  />
                  <BodyButton size="lg" onClick={() => userIdCheck(userId)}>
                    아이디 확인
                  </BodyButton>
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
                  onChange={(e) => setNickName(e.target.value)}
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
