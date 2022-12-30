import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMenu, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import { sidePanalItems } from "../../utlis/GlobalData";

const DashBoard = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const { currentUser } = useDataContext();
  const currentUri = decodeURI(location.pathname);

  return (
    <Flex h={"100vh"} flexDirection={"column"}>
      <Box
        h={"10vh"}
        px={2}
        // pr={4}
        position={"sticky"}
        top={0}
        w={"100%"}
        bg={"white"}
      >
        <HStack
          px={6}
          h={"100%"}
          bg={"#212b36"}
          color={"white"}
          boxShadow={"md"}
          justifyContent={"space-between"}
        >
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Admin Panal
          </Text>
          <Text>Welcome : {currentUser.Username}</Text>
        </HStack>
      </Box>
      <Flex
        p={2}
        // pt={2}
        w={"100%"}
        h={"90vh"}
        flexDirection={{ base: "column", md: "row" }}
        gap={2}
      >
        <Box
          p={4}
          w={{ base: "100%", md: "200px", "2xl": "250px" }}
          color={"white"}
          bg={"#212b36"}
          mt={{ base: toggleMenu ? "0px" : "-408px", md: 0 }}
          h={{ base: "400px", md: "100%" }}
        >
          <VStack flex={1} w={"100%"} alignItems={"flex-start"}>
            {sidePanalItems.map((item, i) => (
              <Link
                key={i}
                to={`/${item.itemName}`}
                style={{ width: "100%" }}
                replace={true}
                onClick={() => setToggleMenu((prev) => !prev)}
              >
                <HStack
                  p={4}
                  w={"100%"}
                  bg={currentUri === `/${item.itemName}` && "black"}
                  _hover={
                    currentUri !== `/${item.itemName}` && {
                      bg: "blackAlpha.400",
                    }
                  }
                  fontSize={{ base: "md", "2xl": "lg" }}
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  <Icon as={item.icon} />
                  <Text>{item.itemName}</Text>
                </HStack>
              </Link>
            ))}
          </VStack>
        </Box>

        <VStack flex={1} overflow={"auto"}>
          <HStack
            px={4}
            py={2}
            w={"100%"}
            justifyContent={"space-between"}
            bg={"gray.300"}
            zIndex={1}
          >
            <IconButton
              boxShadow={"md"}
              fontSize={"xl"}
              bg={"white"}
              icon={<IoMenu />}
              onClick={() => {
                setToggleMenu((prev) => !prev);
              }}
            />
            <Input
              placeholder="Search"
              bg={"white"}
              boxShadow={"sm"}
              size={"md"}
            />

            <HStack color={"white"}>
              <IconButton
                boxShadow={"md"}
                bg={"#212B36"}
                _hover={{ bg: "#313B46" }}
                rounded={"full"}
                onClick={onOpen}
                icon={<Icon fontSize={"xl"} as={IoPersonOutline} />}
              />
              <IconButton
                pl={1}
                boxShadow={"md"}
                bg={"#212B36"}
                _hover={{ bg: "#313B46" }}
                rounded={"full"}
                onClick={onOpen}
                icon={<Icon fontSize={"xl"} as={IoLogOutOutline} />}
              />
            </HStack>
          </HStack>
          <Box
            w={"100%"}
            flex={1}
            // p={{ base: 4, md: 10 }}
            p={4}
            bg={"gray.50"}
            overflow={"auto"}
          >
            <Outlet />
          </Box>
        </VStack>
      </Flex>
      <ConfirmLogoutModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

const ConfirmLogoutModal = ({ isOpen, onClose }) => {
  const { SingOut } = useDataContext();

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Logout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to log out ?</ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme={"red"} onClick={SingOut}>
              Logout
            </Button>
            <Button onClick={onClose}>Close</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DashBoard;
