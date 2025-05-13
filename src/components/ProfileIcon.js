import React from "react";
import styled from "styled-components";

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

const ProfileContainer = styled.div`
  width: 100px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileName = styled.span`
  font-weight: bold;
`;
