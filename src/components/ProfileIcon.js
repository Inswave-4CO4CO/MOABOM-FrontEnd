import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
} from "../styles/components/ProfileIcon";

export const ProfileIcon = ({ imagePath, name, role, cast }) => {
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
