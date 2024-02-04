import { ChangeEvent, useRef, useState } from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";

import CurrentProfile from "./CurrentProfile";
import EditProfile from "./EditProfile";

import { iUserData } from "./user_data/userData";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import {
  iFormErrors,
  initialErrors,
  validateNewUser,
} from "../../utils/login_utils";

interface iUserProfile {
  userData: iUserData;
}

export type updatedDataT = {
  username: string;
  email: string;
  password: string;
  checkPassword: string;
};

function UserProfile({ userData }: iUserProfile) {
  const initialFormData = {
    username: userData.username,
    email: userData.email,
    password: "",
    checkPassword: "",
  };

  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLDivElement | null>(null);

  const [currPassword, setCurrPassword] = useState("");

  const [updatedData, setUpdatedData] = useState<updatedDataT>(initialFormData);

  const [errors, setErrors] = useState<iFormErrors>(initialErrors);

  const validateOnChange = () => {
    validateNewUser(
      {
        username: updatedData.username,
        email: updatedData.email,
        password: updatedData.password || currPassword,
      },
      setErrors
    );
  };

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement>,
    dataType: string
  ) => {
    const val = e.target.value;
    setUpdatedData((prevData) => ({ ...prevData, [dataType]: val }));
    validateOnChange();
  };

  const { handleUpdateProfile } = useUpdateProfile();

  const handleValidateAndUpdate = (
    oldData: iUserData,
    newData: updatedDataT,
    currPassword: string
  ) => {
    // Validate new user returns true if there are no errors / returns false with errors and sets errors
    if (
      validateNewUser(
        {
          username: updatedData.username,
          email: updatedData.email,
          password: updatedData.password || currPassword,
        },
        setErrors
      )
    ) {
      handleUpdateProfile(oldData, newData, currPassword);
      // if success...
      setIsEditing(!isEditing);
      setErrors(initialErrors);
      setUpdatedData(initialFormData);
    }
  };

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
        <BsPerson width={"2rem"} height={"2rem"} cursor={"pointer"} />
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
                updatedData={updatedData}
                handleProfileChange={handleProfileChange}
                errors={errors}
              />
            )}
            {isEditing ? (
              <>
                <FormControl>
                  <FormLabel>
                    Type your current password to save changes:
                  </FormLabel>
                  <Input
                    value={currPassword}
                    type="password"
                    onChange={(e) => setCurrPassword(e.target.value)}
                  />
                  {/* <Text> Incorrect password</Text> */}
                </FormControl>
                <Flex></Flex>
                <Button
                  variant={"solidDark"}
                  marginY={"1rem"}
                  me={"1rem"}
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setCurrPassword("");
                    setUpdatedData(initialFormData);
                    setErrors(initialErrors);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={"solidDark"}
                  isDisabled={
                    updatedData.password !== updatedData.checkPassword ||
                    !currPassword
                  }
                  marginY={"1rem"}
                  onClick={() => {
                    handleValidateAndUpdate(
                      userData,
                      updatedData,
                      currPassword
                    );
                    setUpdatedData(initialFormData);
                    setCurrPassword("");
                  }}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant={"solidDark"}
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
              <Button variant="outlineDark" mr={3} onClick={onClose}>
                Done
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UserProfile;
