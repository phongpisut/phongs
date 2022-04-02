import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Text
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

type CongrateModalProps = {
  isOpen: boolean;
  onClose: any;
  onSend?:any;
};

export default function DetailModal({
  isOpen = false,
  onClose,
  onSend,
}: CongrateModalProps) {

  return (
    
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader fontFamily={'Athiti'}>ข้อมูลกิจกรรม</ModalHeader>
      <ModalCloseButton />
      <ModalBody >
        <Text fontFamily={'Athiti'} mb='1rem'>
            📅 รับจริงวันที่ : 3 เมษายน 2565 (วันอาทิตย์)
        </Text>
        <Text fontFamily={'Athiti'} mb='1rem'>
            🚌 สถานที่จัด :  <a style={{color:'blue'}}  rel="noreferrer" target={"_blank"} href="https://www.google.com/maps/dir//%E0%B8%AB%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%A1%E0%B8%87%E0%B8%84%E0%B8%A5/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x311d607e0cc3104b:0x51471fe2be0d175f?sa=X&ved=2ahUKEwjWidi5-_T2AhWyTGwGHRL9AzEQ9Rd6BAhcEAQ">
              หอรัชมงคล สวนหลวง ร.9</a> 📍
        </Text>
        <Text fontFamily={'Athiti'} mb='1rem'>
            ⏲️ เวลาออกจากหอรัชมงคล : 11:00 น.
        </Text>
        <Text fontFamily={'Athiti'} mb='1rem'>
            🎓 <a style={{color:'blue'}}   rel="noreferrer" target={"_blank"} href="https://www.facebook.com/ThaiNichi">ร่วมชมการรับปริญญาได้ที่เพจมหาลัย</a>
        </Text>
        
      </ModalBody>
    </ModalContent>
  </Modal>
  );
}
