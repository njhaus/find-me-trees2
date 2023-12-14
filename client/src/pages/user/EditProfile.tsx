import { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
    FormHelperText,
    Input,
  Flex,
  Text
} from "@chakra-ui/react";

import { updatedDataT } from "./UserProfile";

interface iEditProfile {
  username: string;
  email: string;
  updatedData: updatedDataT;
  handleProfileChange: (key: keyof updatedDataT, val: string) => void;
}
    
const EditProfile = ({username, email, updatedData, handleProfileChange}: iEditProfile) => {

  return (
    <Flex>
      <form>
        <FormControl>
          <FormLabel>Update Username</FormLabel>
          <Input
            type="text"
            placeholder={username}
            onChange={(e) => handleProfileChange("username", e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Update Email</FormLabel>
          <Input
            type="email"
            placeholder={email}
            onChange={(e) => handleProfileChange("email", e.target.value)}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Update Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => handleProfileChange("password", e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Retype New Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => handleProfileChange("checkPassword", e.target.value)}
          />
          {updatedData.password !== updatedData.checkPassword && <Text>Your passwords must match.</Text>}
        </FormControl>
      </form>
    </Flex>
  );
};

export default EditProfile;
