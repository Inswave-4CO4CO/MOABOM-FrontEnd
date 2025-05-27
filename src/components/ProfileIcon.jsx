import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
} from "../styles/components/ProfileIcon";
import defaultImage from "../assets/images/defaultImage.png";
import { useNavigate } from "react-router-dom";
//프로필
const ProfileIcon = ({
  imagePath,
  name,
  role,
  cast,
  personId,
  isProfile = false,
}) => {
  const navigate = useNavigate();

  const handlePersonClick = () => {
    navigate(`/person/${personId}`);
  };

  return (
    <ProfileContainer onClick={!isProfile ? handlePersonClick : undefined}>
      {imagePath ? (
        <ProfileImage src={imagePath} alt={name} />
      ) : (
        <ProfileImage src={defaultImage} alt={name} />
      )}
      {cast}
      <div className="profileGroup">
        <ProfileName>{name}</ProfileName>
        <span>{role}</span>
      </div>
    </ProfileContainer>
  );
};

export default ProfileIcon;
