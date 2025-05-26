import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
} from "../styles/components/ProfileIcon";
import defaultImage from "../assets/images/defaultImage.png";
import { useNavigate } from "react-router-dom";
//프로필
const ProfileIcon = ({ imagePath, name, role, cast, personId }) => {
  const navigate = useNavigate();

  const handlePersonClick = () => {
    navigate(`/person/${personId}`);
  };

  return (
    <ProfileContainer onClick={handlePersonClick}>
      {imagePath ? (
        <ProfileImage src={imagePath} alt={name} />
      ) : (
        <ProfileImage src={defaultImage} alt={name} />
      )}
      {role}
      <ProfileName>{name}</ProfileName>
      {cast}
    </ProfileContainer>
  );
};

export default ProfileIcon;
