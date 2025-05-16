import React, { useState } from "react";
import { FaPlus, FaCheck, FaPen } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import styled from "styled-components";
import { ButtonPtag, Container } from "../styles/components/WatchButton";

const WatchButton = ({ type, isDisable = true }) => {
  const [visited, setVisited] = useState(isDisable);

  let icon;
  let buttonName;
  switch (type) {
    case "WANT":
      icon = <FaPlus size={30} />;
      buttonName = "보고싶다";
      break;
    case "ING":
      icon = <IoEye size={30} />;
      buttonName = "보는중";
      break;
    case "ED":
      icon = <FaCheck size={30} />;
      buttonName = "봤다";
      break;
    case "REVIEW":
      icon = <FaPen size={27} />;
      buttonName = "한줄평";
      break;
    default:
      icon = null;
  }

  const handleClick = () => {
    setVisited((prev) => !prev);
  };

  return (
    <Container visited={visited} onClick={handleClick}>
      <div className="icon">{icon}</div>
      <ButtonPtag>{buttonName}</ButtonPtag>
    </Container>
  );
};

export default WatchButton;
