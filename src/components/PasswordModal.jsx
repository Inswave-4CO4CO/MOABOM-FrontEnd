import { Dialog, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { changePassword } from "../services/api/user";
import { toast } from "react-toastify";
import BodyButton from "./BodyButton";
import LabelInput from "./LabelInput";
import Modal from "./Modal";

const PasswordModal = () => {
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
          <LabelInput
            label="비밀번호 확인"
            isPassword={true}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </VStack>
      </Modal>
    </Dialog.Root>
  );
};

export default PasswordModal;
