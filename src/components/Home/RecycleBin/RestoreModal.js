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

const RestoreModal = ({ modalStatus, setModalStatus, selectedUser }) => {
  const { createUser, fetchUserAllData, fetchrRecyleData, deleteRecycle } =
    useDataContext();
  const toast = useToast();

  const handleDeleteUser = () => {
    createUser(selectedUser, selectedUser, ({ error, msg }) => {
      if (error) {
        toast({
          title: "Error !!",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "User data restored successfully",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        deleteRecycle(selectedUser.UserID, () => {
          fetchUserAllData();
          fetchrRecyleData();
          setModalStatus((prev) => ({ ...prev, restoreModal: false }));
        });
      }
    });
  };
  return (
    <Modal
      onClose={() =>
        setModalStatus((prev) => ({ ...prev, restoreModal: false }))
      }
      isOpen={modalStatus.restoreModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Confirm Restore {selectedUser["Employee Name"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack fontSize={"sm"} alignItems={"flex-start"} overflow={"clip"}>
            <Text>Data will be restore to database</Text>
            <Divider />
            {Object.keys(selectedUser).map((list, i) => (
              <Text key={i} color={"gray.400"}>
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
            <Button colorScheme={"blue"} onClick={handleDeleteUser}>
              Restore data
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({
                  ...prev,
                  restoreModal: false,
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

export default RestoreModal;
