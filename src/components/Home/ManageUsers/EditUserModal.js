import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDataContext } from "../../../contexts/DataContext";

const EditUserModal = ({
  updatedUser,
  setUpdatedUser,
  modalStatus,
  setModalStatus,
}) => {
  const { updateUser, fetchUserAllData } = useDataContext();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(updatedUser, ({ error, msg }) => {
      if (error) {
        toast({
          title: "Error !!",
          description: error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        setModalStatus((prev) => ({ ...prev, editModal: false }));
        toast({
          title: "Success",
          description: msg.message,
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        fetchUserAllData();
      }
    });
  };

  return (
    <Modal
      onClose={() => setModalStatus((prev) => ({ ...prev, editModal: false }))}
      isOpen={modalStatus.editModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent as={"form"} onSubmit={handleSubmit}>
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection={"column"} gap={2}>
            {Object.keys(updatedUser).map((list, i) => (
              <HStack flex={1} key={i}>
                <Text flex={0.3} textAlign={"end"}>
                  {list} :
                </Text>
                <Input
                  disabled={list === "UserID" && true}
                  type={
                    list === "Email"
                      ? "email"
                      : list === "Joining Date" || list === "Date Of Birth"
                      ? "date"
                      : " text"
                  }
                  flex={0.7}
                  value={updatedUser[list]}
                  onChange={(e) =>
                    setUpdatedUser((prev) => ({
                      ...prev,
                      [list]: e.target.value,
                    }))
                  }
                />
              </HStack>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button type="submit">Proceed to update</Button>
            <Button
              onClick={() =>
                setModalStatus((prev) => ({ ...prev, editModal: false }))
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

export default EditUserModal;
