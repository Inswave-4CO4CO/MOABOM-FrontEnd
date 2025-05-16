import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import HeaderButton from "./HeaderButton";

//모달
const Modal = ({
  modalButton,
  cancel = "취소",
  save = "저장",
  title = "모달",
  text = "모달",
  onClick,
}) => {
  return (
    <Dialog.Root key={"center"} placement={"center"}>
      <Dialog.Trigger asChild>{modalButton}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{text}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <HeaderButton children={cancel} />
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <HeaderButton children={save} onClick={onClick} />
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
