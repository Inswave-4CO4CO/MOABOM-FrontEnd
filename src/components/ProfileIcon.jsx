import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
} from "../styles/components/ProfileIcon";
import { FaCircleUser } from "react-icons/fa6";

//프로필
const ProfileIcon = ({ imagePath, name, role, cast }) => {
  return (
    <ProfileContainer>
      {imagePath ? (
        <ProfileImage src={imagePath} alt={name} />
      ) : (
        <FaCircleUser size={100} />
      )}
      {role}
      <ProfileName>{name}</ProfileName>
      {cast}
    </ProfileContainer>
  );
};

export default ProfileIcon;
