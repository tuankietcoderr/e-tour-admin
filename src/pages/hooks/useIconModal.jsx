import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

export default function useIconModal({
  icon,
  style,
  handleFunc,
  actionText,
  description,
  title,
  color,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      <IconButton onClick={onOpen} {...style}>
        {icon}
      </IconButton>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {description}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              variant={"ghost"}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme={color}
              onClick={() => {
                try {
                  handleFunc();
                  onClose();
                } catch (err) {
                  toast({
                    description: err.message,
                    status: "error",
                    duration: 1000,
                  });
                }
              }}
            >
              {actionText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
