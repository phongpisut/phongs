import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormLabel,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import React, { MouseEventHandler, useState } from "react";

type CongrateModalProps = {
  isOpen: boolean;
  onClose: any;
};

export default function CongrateModal({
  isOpen = false,
  onClose,
}: CongrateModalProps) {
  const initialRef = React.useRef<any>();
  const finalRef = React.useRef<any>();
  const [inputState, setInputState] = useState<{
    img?: string;
    name?: string;
    desc?: string;
  }>();

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent fontFamily={"Athiti"}>
          <ModalHeader>ลงชื่อแสดงความยินดี</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>ลิ้งค์รูปภาพ</FormLabel>
              <Input
                ref={initialRef}
                placeholder="URL"
                onChange={(e) => console.log(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>ชื่อ</FormLabel>
              <Input
                ref={initialRef}
                placeholder="เราเอง"
                onChange={(e) => console.log(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>คำอวยพร / อธิบาย</FormLabel>
              <Textarea placeholder="ยินดีด้วยย" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
