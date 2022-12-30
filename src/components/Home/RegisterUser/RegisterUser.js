import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { userDataKeys } from "../../../utlis/GlobalData";
const RegisterUser = () => {
  const userDataKeys_ = userDataKeys.filter(({ itemName }) =>
    itemName === "Password" || itemName === "UserID" ? "" : itemName
  );
  const inputInitialData = [
    { UserID: "", Password: "" },
    {
      "Employee Name": "",
      Email: "",
      "Date Of Birth": "",
      Company: "",
      "Job Title": "",
      "Joining Date": "",
      Mobile: "",
      Nationality: "",
      Type: "",
    },
  ];

  const [userAuth, setUserAuth] = useState(inputInitialData[0]);
  const [userInfo, setUserInfo] = useState(inputInitialData[1]);
  const { createUser, fetchUserAllData } = useDataContext();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(userAuth, userInfo, ({ error, msg }) => {
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
          description: msg.message,
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setUserAuth({ ...inputInitialData[0] });
        setUserInfo({ ...inputInitialData[1] });
        fetchUserAllData();
      }
    });
  };

  return (
    <Flex h={"100%"} w={"100%"} flexDirection={"column"} gap={6}>
      <HStack>
        <Text fontSize={"2xl"}>Register User, Create a new user</Text>
      </HStack>
      <Container h={"100%"} maxW={"4xl"}>
        <VStack as={"form"} gap={4} onSubmit={handleSubmit}>
          <Text fontSize={"2xl"}>User Authentication</Text>
          <Wrap flex={1} justify={"center"}>
            <WrapItem p={2} w={"300px"}>
              <FormControl>
                <FormLabel px={1} fontSize={"sm"} color={"gray.500"}>
                  UserID
                </FormLabel>
                <Input
                  bg={"white"}
                  required
                  value={userAuth.UserID}
                  onChange={(e) => {
                    setUserAuth((prev) => ({
                      ...prev,
                      UserID: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </WrapItem>
            <WrapItem p={2} w={"300px"}>
              <FormControl>
                <FormLabel px={1} fontSize={"sm"} color={"gray.500"}>
                  Password
                </FormLabel>
                <Input
                  bg={"white"}
                  required
                  value={userAuth.Password}
                  onChange={(e) => {
                    setUserAuth((prev) => ({
                      ...prev,
                      Password: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </WrapItem>
          </Wrap>
          <Text fontSize={"2xl"}>User Information</Text>
          <Wrap flex={1} justify={"center"}>
            {userDataKeys_.map((list, i) => (
              <WrapItem key={i} p={2} w={"250px"}>
                <FormControl>
                  <FormLabel px={1} fontSize={"sm"} color={"gray.500"}>
                    {list.itemName}
                  </FormLabel>
                  <Input
                    bg={"white"}
                    type={list.type}
                    required
                    value={userInfo[list.itemName]}
                    onChange={(e) => {
                      setUserInfo((prev) => ({
                        ...prev,
                        [list.itemName]: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
              </WrapItem>
            ))}
          </Wrap>
          <Button colorScheme={"linkedin"} type="submit">
            Submit
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};

export default RegisterUser;
