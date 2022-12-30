import {
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { userDataKeys } from "../../../utlis/GlobalData";
import { IoRefresh } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmPermanentDeleteModal from "./ConfirmPermanentDeleteModal";
import RestoreModal from "./RestoreModal";

const Recyclebin = () => {
  const { recyclebinData, fetchrRecyleData } = useDataContext();
  const [selectedUser, setSelectedUser] = useState({});
  //   const [updatedUser, setUpdatedUser] = useState({});
  const [modalStatus, setModalStatus] = useState({
    restoreModal: false,
    permanentDeleteModal: false,
  });

  return (
    <Flex
      h={"100%"}
      w={"100%"}
      flexDirection={"column"}
      gap={12}
      overflow={"auto"}
    >
      <HStack justifyContent={"space-between"} minW={"fit-content"}>
        <Text flex={0.8} fontSize={{ base: "lg", md: "2xl" }}>
          Recycle Bin, Restore data or permanently delete them
        </Text>
        <Button
          colorScheme={"facebook"}
          rightIcon={<IoRefresh />}
          fontSize={{ base: "sm", md: "md" }}
          onClick={() => fetchrRecyleData()}
        >
          Refresh
        </Button>
      </HStack>
      <VStack
        h={"100%"}
        w={"100%"}
        overflow={"auto"}
        divider={<StackDivider />}
        color={"gray.600"}
      >
        <HStack
          p={2}
          w={"100%"}
          justifyContent={"space-between"}
          fontSize={"xs"}
          divider={<StackDivider />}
        >
          {userDataKeys.map((list, i) => (
            <Text
              textAlign={"center"}
              w={list.width}
              minW={list.width}
              key={i}
              fontWeight={"bold"}
              fontSize={{ base: "xs", "2xl": "sm" }}
            >
              {list.itemName}
            </Text>
          ))}
          <Text textAlign={"center"} w={"80px"} fontWeight={"bold"}>
            Manage
          </Text>
        </HStack>

        {recyclebinData.length ? (
          recyclebinData.map((userData, i) => (
            <HStack
              key={i}
              fontSize={{ base: "xs", "2xl": "sm" }}
              w={"100%"}
              justifyContent={"space-between"}
              p={2}
              cursor={"pointer"}
              _hover={{ bg: "gray.200" }}
              divider={<StackDivider />}
            >
              {userDataKeys.map((keylist, i) => (
                <Text
                  textAlign={"center"}
                  w={keylist.width}
                  minW={keylist.width}
                  key={i + "a"}
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {userData[keylist.itemName]}
                </Text>
              ))}
              <HStack w={"80px"}>
                <IconButton
                  size={"sm"}
                  fontSize={"md"}
                  // variant={"outline"}
                  // color={"blue.400"}
                  colorScheme={"blue"}
                  borderRadius={0}
                  icon={<IoRefresh />}
                  onClick={() => {
                    setModalStatus((prev) => ({ ...prev, restoreModal: true }));
                    setSelectedUser(userData);
                  }}
                />
                <IconButton
                  size={"sm"}
                  fontSize={"md"}
                  colorScheme={"red"}
                  borderRadius={0}
                  icon={<FaRegTrashAlt />}
                  onClick={() => {
                    setModalStatus((prev) => ({
                      ...prev,
                      permanentDeleteModal: true,
                    }));
                    setSelectedUser(userData);
                  }}
                />
              </HStack>
            </HStack>
          ))
        ) : (
          <Center h={"20%"} fontSize={"2xl"}>
            No data in Recycle Bin !!
          </Center>
        )}
      </VStack>

      {selectedUser && (
        <>
          <ConfirmPermanentDeleteModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            selectedUser={selectedUser}
          />
          <RestoreModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            selectedUser={selectedUser}
          />
        </>
      )}
    </Flex>
  );
};

export default Recyclebin;
