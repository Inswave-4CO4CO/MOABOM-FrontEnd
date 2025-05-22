import ProfileIcon from "./ProfileIcon";
import WatchButton from "./WatchButton";
import styled from "styled-components";
import BodyButton from "./BodyButton";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/images/defaultImage.png";
import Modal from "./Modal";
import { Dialog } from "@chakra-ui/react";
import { useState } from "react";
import LabelInput from "./LabelInput";

const Profile = ({
  image = null,
  name = "모아봄",
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

  const handleEditProfile = () => {
    navigate("/");
  };

  const action = [
    { text: "취소", onClick: null },
    {
      text: "수정",
      onClick: null,
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
          <BodyButton onClick={handleEditProfile}>프로필 관리</BodyButton>
        ) : (
          isEdit && (
            <Dialog.Root key={"center"} placement={"center"}>
              <Dialog.Trigger asChild>
                <BodyButton>비밀번호 수정</BodyButton>
              </Dialog.Trigger>
              <Modal title="비밀번호 수정" actions={action}>
                <LabelInput
                  style={{ marginBottom: "15px" }}
                  label="새 비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LabelInput
                  label="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
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
