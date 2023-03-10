import {
  Input,
  Text,
  VStack,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { api } from "../../../utlis/GlobalData";
import { csv2json } from "../../../utlis/Helper_func";
import TempletDownloadBtn from "./TempletDownloadBtn";

const AddTableDataModel = () => {
  const { makeToast, currentUser } = useDataContext();
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleSubmit = () => {
    csv2json(file, ({ label, data }) => {
      axios
        .post(`${api}/db/addtoPaysilp`, { data })
        .then((res) => {
          makeToast("success", res.data.message);
        })
        .catch((err) => {
          const msg = err.response.data.error.message || err.message;
          makeToast("error", msg);
        })
        .finally(() => {});
    });
  };

  return (
    <>
      <ModalHeader>Add New Data</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack gap={10}>
          <Text w={"100%"} textAlign={"left"}>
            Upload a .csv file to add new data
          </Text>
          <Input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleChange}
            variant={"flushed"}
          />
        </VStack>
      </ModalBody>
      <ModalFooter>
        <HStack gap={2}>
          <TempletDownloadBtn />
          <Button
            colorScheme={"blue"}
            onClick={handleSubmit}
            disabled={currentUser.AccountType === "Member" ? true : false}
          >
            Confirm Add
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};

export default AddTableDataModel;
