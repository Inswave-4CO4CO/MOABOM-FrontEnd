import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import HeaderButton from "./HeaderButton";

const Modal = ({
  modalButton,
  title = "모달",
  text = "모달",
  actions = [],
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
            <Dialog.Body>{text}</Dialog.Body>
            <Dialog.Footer>
              {actions.map((action, idx) => (
                <Dialog.ActionTrigger asChild key={idx}>
                  <HeaderButton onClick={action.onClick}>
                    {action.text}
                  </HeaderButton>
                </Dialog.ActionTrigger>
              ))}
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
