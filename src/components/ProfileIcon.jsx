import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
} from "../styles/components/ProfileIcon";

const ProfileIcon = ({ imagePath, name, role, cast }) => {
  return (
    <ProfileContainer>
      <ProfileImage src={imagePath} alt={name} />
      {role}
      <br />
      <ProfileName>{name}</ProfileName>
      <br />
      {cast}
    </ProfileContainer>
  );
};

export default ProfileIcon;
