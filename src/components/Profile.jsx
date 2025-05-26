import ProfileIcon from "./ProfileIcon";
import WatchButton from "./WatchButton";
import BodyButton from "./BodyButton";
import { useNavigate } from "react-router-dom";
import { Container, Icon } from "../styles/components/Profile";
import PasswordModal from "./PasswordModal";
import { useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";

const Profile = ({
  image = null,
  name = "로딩 중",
  isMyPage = false,
  isEdit = false,
  firstCount = 0,
  secondCount = 0,
  handleFirstAction = null,
  handleSecondAction = null,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(image);
  }, []);

  return (
    <Skeleton loading={isLoading}>
      <Container>
        <div>
          <ProfileIcon imagePath={image} />
          <h1 className="name">{name}</h1>
        </div>
        <div className="buttonBox">
          {isMyPage ? (
            <BodyButton onClick={() => navigate("/mypage/edit")}>
              프로필 관리
            </BodyButton>
          ) : (
            isEdit && <PasswordModal />
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
    </Skeleton>
  );
};

export default Profile;
