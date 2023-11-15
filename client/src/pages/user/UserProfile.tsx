import { useRef, useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Flex
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";

import EditProfile from "./EditProfile";
import CurrentProfile from "./CurrentProfile";

interface iUserProfile {
    userName: string;
    email: string;
}

function UserProfile({ userName, email }: iUserProfile) {
    
const [isEditing, setIsEditing] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        ref={btnRef}
        onClick={onOpen}
        width={"2.5rem"}
        height={"2.5rem"}
        borderRadius={"50%"}
      >
        <BsPerson width={"2rem"} height={"2rem"} />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`${userName}'s Account`}</DrawerHeader>

          <DrawerBody>
            {!isEditing && <CurrentProfile userName={userName} email={email} />}
            {isEditing && <EditProfile userName={userName} email={email} />}
                      <Button
                          marginY={'1rem'}
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "Save" : "Edit"} Account
            </Button>
          </DrawerBody>

          <DrawerFooter>
            {!isEditing && <Button variant="outline" mr={3} onClick={onClose}>
                Done
            </Button>}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserProfile