import React from "react";
import ProfileIcon from "./ProfileIcon";
import WatchButton from "./WatchButton";
import BodyButton from "./BodyButton";
import { useNavigate } from "react-router-dom";
import { Container, Icon } from "../styles/components/Profile";

const Profile = ({
  image,
  name = "모아봄",
  isMyPage = true,
  firstCount = 0,
  secondCount = 0,
  onFirstClick,
  onSecondClick,
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
            onClick={onFirstClick}
          />
          <WatchButton
            icon={<Icon>{secondCount}</Icon>}
            text={isMyPage ? "한줄평" : "연출작"}
            onClick={onSecondClick}
          />
        </div>
      </div>
    </Container>
  );
};

export default Profile;
