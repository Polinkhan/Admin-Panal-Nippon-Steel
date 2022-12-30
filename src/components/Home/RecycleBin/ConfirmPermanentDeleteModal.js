import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDataContext } from "../../../contexts/DataContext";

const ConfirmPermanentDeleteModal = ({
  modalStatus,
  setModalStatus,
  selectedUser,
}) => {
  const { deleteRecycle, fetchrRecyleData } = useDataContext();
  const toast = useToast();

  const handleDeleteUser = () => {
    deleteRecycle(selectedUser.UserID, ({ error, msg }) => {
      if (error) {
        toast({
          title: "Error !!",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        setModalStatus((prev) => ({ ...prev, permanentDeleteModal: false }));
        toast({
          title: "Success",
          description: msg.message,
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        fetchrRecyleData();
      }
    });
  };
  return (
    <Modal
      onClose={() =>
        setModalStatus((prev) => ({ ...prev, permanentDeleteModal: false }))
      }
      isOpen={modalStatus.permanentDeleteModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Confirm Permanent Delete {selectedUser["Employee Name"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack fontSize={"sm"} alignItems={"flex-start"} overflow={"clip"}>
            <Text>
              You are about to delete the user data Permanently, data will lost
              and this operation can't be undone
            </Text>
            <Divider />
            {Object.keys(selectedUser).map((list, i) => (
              <Text as={"del"} key={i} color={"gray.400"}>
                {list}
                {"\t:"}
                {selectedUser[list]}
              </Text>
            ))}
            <Divider />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme={"red"} onClick={handleDeleteUser}>
              Proceed to delete
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({
                  ...prev,
                  permanentDeleteModal: false,
                }))
              }
            >
              Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmPermanentDeleteModal;
