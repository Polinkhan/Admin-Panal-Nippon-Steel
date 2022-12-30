import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ManageDB = () => {
  return (
    <Flex
      h={"100%"}
      w={"100%"}
      flexDirection={"column"}
      gap={12}
      overflow={"auto"}
    >
      <VStack
        justifyContent={"space-between"}
        minW={"fit-content"}
        alignItems={"flex-start"}
      >
        <Text fontSize={"2xl"}>Manage DB, Change internal app settings</Text>;
        <Text fontSize={"lg"}>Currently Under Development !!</Text>;
      </VStack>
    </Flex>
  );
};

export default ManageDB;
