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

const ConfirmDeleteModal = ({ modalStatus, setModalStatus, selectedUser }) => {
  const { deleteUser, fetchUserAllData, fetchrRecyleData } = useDataContext();
  const toast = useToast();

  const handleDeleteUser = () => {
    deleteUser(selectedUser, ({ error, msg }) => {
      if (error) {
        toast({
          title: "Error !!",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        setModalStatus((prev) => ({ ...prev, deleteModal: false }));
        toast({
          title: "Success",
          description: msg.message,
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        fetchUserAllData();
        fetchrRecyleData();
      }
    });
  };
  return (
    <Modal
      onClose={() =>
        setModalStatus((prev) => ({ ...prev, deleteModal: false }))
      }
      isOpen={modalStatus.deleteModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Move to Recycle Bin</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack fontSize={"sm"} alignItems={"flex-start"} overflow={"clip"}>
            <Text>
              You are about to delete the user, you can also retrive the data
              from Recycle bin, User can't log in into app if their data is in
              Recycle
            </Text>
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
            <Button colorScheme={"red"} onClick={handleDeleteUser}>
              Move to Recycle Bin
            </Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({ ...prev, deleteModal: false }))
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

export default ConfirmDeleteModal;
