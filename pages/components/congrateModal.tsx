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
  Textarea,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

type CongrateModalProps = {
  isOpen: boolean;
  onClose: any;
  onSend?:any;
};

export default function CongrateModal({
  isOpen = false,
  onClose,
  onSend,
}: CongrateModalProps) {
  const initialRef = React.useRef<any>();
  const finalRef = React.useRef<any>();
  const [inputState, setInputState] = useState({name:'',img:'',desc:''});
  const [disable , setDisable] = useState(true)

  useEffect(()=>{
    if(inputState?.desc && inputState?.name){
      setDisable(false)
    }
    else{
      setDisable(true)
    }
  },[inputState , disable])


  const onPressSave = useCallback(
    () => {
      onSend(inputState)
    },
    [onSend , inputState],
  )
  
  

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={()=>setInputState({name:'',desc:'',img:''})}
      >
        <ModalOverlay />
        <ModalContent fontFamily={"Athiti"}>
          <ModalHeader>ลงชื่อแสดงความยินดี</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>ลิ้งค์รูปภาพ (ไม่บังคับ)</FormLabel>
              <Input
                ref={initialRef}
                placeholder="URL"
                onChange={(e) => setInputState({...inputState,img:e.target.value})}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>ชื่อ</FormLabel>
              <Input
                ref={initialRef}
                placeholder="เราเอง"
                onChange={(e) => setInputState({...inputState,name:e.target.value})}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>คำอวยพร / อธิบาย</FormLabel>
              <Textarea placeholder="ยินดีด้วยย"  onChange={(e) => setInputState({...inputState,desc:e.target.value})} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onPressSave} colorScheme="blue" mr={3} disabled={disable}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
