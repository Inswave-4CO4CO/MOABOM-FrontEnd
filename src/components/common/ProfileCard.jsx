import ProfileIcon from "./Profile";
import WatchButton from "./WatchButton";
import BodyButton from "./BodyButton";
import { useNavigate } from "react-router-dom";
import { Container, Icon, ProfileWrap } from "../../styles/components/Profile";
import PasswordModal from "./PasswordModal";
import { Skeleton } from "@chakra-ui/react";

const ProfileCard = ({
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

  return (
    <Skeleton loading={isLoading} borderRadius="10px">
      <Container>
        <ProfileWrap>
          <ProfileIcon imagePath={image} isProfile={true} />
          <h1 className="name">{name}</h1>
        </ProfileWrap>
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

export default ProfileCard;
