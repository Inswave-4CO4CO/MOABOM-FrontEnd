import React from "react";
import ProfileIcon from "./ProfileIcon";
import WatchButton from "./WatchButton";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";
import BodyButton from "./BodyButton";
import { useNavigate } from "react-router-dom";

const Profile = ({
  image,
  name = "모아봄",
  isMyPage = true,
  firstCount = 0,
  secondCount = 0,
  handleFirstAction,
  handleSecondAction,
}) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/");
  };

  return (
    <Container>
      <div>
        <ProfileIcon imagePath={image} />
        <h1 className="name">{name}</h1>
      </div>
      <div className="buttonBox">
        {isMyPage ? (
          <BodyButton onClick={handleEditProfile}>프로필 관리</BodyButton>
        ) : (
          <></>
        )}

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
