import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
} from "../styles/components/ProfileIcon";
import defaultImage from "../assets/images/defaultImage.png";
import { FaCircleUser } from "react-icons/fa6";

//프로필
const ProfileIcon = ({ imagePath, name, role, cast, onClick }) => {
  return (
    <ProfileContainer onClick={onClick}>
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
