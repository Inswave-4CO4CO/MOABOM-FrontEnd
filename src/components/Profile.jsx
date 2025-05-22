import ProfileIcon from "./ProfileIcon";
import WatchButton from "./WatchButton";
import styled from "styled-components";
import BodyButton from "./BodyButton";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/images/defaultImage.png";
import Modal from "./Modal";
import { Dialog, VStack } from "@chakra-ui/react";
import { useState } from "react";
import LabelInput from "./LabelInput";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/api/user";
import { toast } from "react-toastify";

const Profile = ({
  image = null,
  name = "로딩 중",
  isMyPage = false,
  isEdit = false,
  firstCount = 0,
  secondCount = 0,
  handleFirstAction = null,
  handleSecondAction = null,
}) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("비밀번호가 성공적으로 변경되었습니다!");
      // 필요시 추가 동작(예: 모달 닫기, 상태 초기화 등)
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "비밀번호 변경에 실패했습니다."
      );
    },
  });

  const handlePasswordChange = () => {
    if (!password || !passwordConfirm) {
      toast.error("비밀번호와 확인란을 모두 입력하세요.");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    mutate({ newPassword: password });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const action = [
    { text: "취소", onClick: () => setIsModalOpen(false) },
    {
      text: "수정",
      onClick: handlePasswordChange,
    },
  ];

  return (
    <Container>
      <div>
        <ProfileIcon imagePath={image !== null ? image : defaultImage} />
        <h1 className="name">{name}</h1>
      </div>
      <div className="buttonBox">
        {isMyPage ? (
          <BodyButton onClick={() => navigate("/edit")}>프로필 관리</BodyButton>
        ) : (
          isEdit && (
            <Dialog.Root
              key={"center"}
              placement={"center"}
              open={isModalOpen}
              onOpenChange={() => setIsModalOpen(!isModalOpen)}
            >
              <Dialog.Trigger asChild>
                <BodyButton>비밀번호 수정</BodyButton>
              </Dialog.Trigger>
              <Modal title="비밀번호 수정" actions={action}>
                <VStack spacing={4} align="stretch">
                  <LabelInput
                    label="새 비밀번호"
                    isPassword={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div></div>
                  <LabelInput
                    label="비밀번호 확인"
                    isPassword={true}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </VStack>
              </Modal>
            </Dialog.Root>
          )
        )}
        {!isEdit && (
          <div className="subButtonBox">
            <WatchButton
              icon={<Icon>{firstCount}</Icon>}
              text={isMyPage ? "보관함" : "출연작"}
              onClick={handleFirstAction}
            />
            <WatchButton
              icon={<Icon>{secondCount}</Icon>}
              text={isMyPage ? "한줄평" : "연출작"}
              onClick={handleSecondAction}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 20px;
  padding: 60px 40px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;

  .name {
    font-size: 24px;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 25px;
  }

  .buttonBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
  }

  .subButtonBox {
    display: flex;
    justify-content: center;
    gap: 70px;
    width: 100%;
  }
`;

const Icon = styled.p`
  font-size: 20px;
  color: #555;
`;

export default Profile;
