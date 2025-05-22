import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import HeaderButton from "./HeaderButton";

const Modal = ({ title = "모달", actions = [], children }) => {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
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
  );
};

export default Modal;
