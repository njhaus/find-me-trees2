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
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";

import EditProfile from "./EditProfile";
import CurrentProfile from "./CurrentProfile";

import { iUserData } from "../../data/user_data/userData";
import { apiPatch } from "../../services/api_client";

interface iUserProfile {
    userData: iUserData
}

export type updatedDataT = {
  username: string;
  email: string;
  password: string;
  checkPassword?: string;
};


function UserProfile({ userData }: iUserProfile) {

const initialFormData = {
  username: userData.username,
  email: userData.email,
  password: "",
  checkPassword: "",
};
    
const [isEditing, setIsEditing] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);

  const [currPassword, setCurrPassword] = useState("");

  const [updatedData, setUpdatedData] = useState<updatedDataT>(initialFormData);

  const handleProfileChange = (key: keyof updatedDataT, val: string) => {
    setUpdatedData((prevData) => ({ ...prevData, [key]: val }));
  };

  const handleSubmit = async() => {
    // Need to send old username and access token through for validation and finding user.
    const body = {
      newUsername: updatedData.username
        ? updatedData.username
        : userData.username,
      newEmail: updatedData.email ? updatedData.email : userData.email,
      newPassword: updatedData.password,
      accessToken: userData.accessToken,
      username: userData.username,
      password: currPassword,
    };
    try {
      const updatedUserData = await apiPatch('user/profileupdate', body);
      console.log(updatedUserData)
    } catch (err) {
      console.log(err)
    }
  }

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
          <DrawerHeader>{`${userData.username}'s Account`}</DrawerHeader>

          <DrawerBody>
            {!isEditing && (
              <CurrentProfile
                username={userData.username}
                email={userData.email}
              />
            )}
            {isEditing && (
              <EditProfile
                username={userData.username}
                email={userData.email}
                updatedData={updatedData}
                handleProfileChange={handleProfileChange}
              />
            )}
            {isEditing ? (
              <>
                <FormControl>
                  <FormLabel>
                    Type your current password to save changes:
                  </FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setCurrPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  marginY={"1rem"}
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  isDisabled={
                    updatedData.password !== updatedData.checkPassword
                  }
                  marginY={"1rem"}
                  onClick={() => {
                    setIsEditing(!isEditing);
                    handleSubmit();
                    setUpdatedData(initialFormData);
                  }}
                >
                  {isEditing ? "Save Changes" : "Edit Account"}
                </Button>
              </>
            ) : (
              <Button
                isDisabled={updatedData.password !== updatedData.checkPassword}
                marginY={"1rem"}
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
              >
                Edit Account
              </Button>
            )}
          </DrawerBody>

          <DrawerFooter>
            {!isEditing && (
              <Button variant="outline" mr={3} onClick={onClose}>
                Done
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserProfile