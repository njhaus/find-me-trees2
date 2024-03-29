import { ChangeEvent } from "react";

import {
  Flex,
  FormControl,
  Text
} from "@chakra-ui/react";

import { FaEnvelope, FaUser, FaUserShield } from "react-icons/fa";
import IconInput from "../../components/inputs/IconInput";
import { iFormErrors } from "../../utils/login_utils";
import { updatedDataT } from "./UserProfile";

interface iEditProfile {
  updatedData: updatedDataT;
  handleProfileChange: (
    e: ChangeEvent<HTMLInputElement>,
    dataType: string
  ) => void;
  errors: iFormErrors;
}
    
const EditProfile = ({updatedData, handleProfileChange, errors}: iEditProfile) => {

  

  return (
    <Flex>
      <form>
        <FormControl>
          {/* KEEPING THE OLD FUNCTIONAL INPUTS JUST IN CASE A SUPER ANNOYING BUG ARISES FROM USING THE ICON INPUTS */}
          {/* <FormLabel>Update Username</FormLabel> */}
          {/* <Input
            value={updatedData.username}
            type="text"
            placeholder={username}
            onChange={(e) => handleProfileChange("username", e.target.value)}
          /> */}
          <IconInput
            icon={<FaUser/>}
            labelText="Update Username:"
            labelFor="username"
            inputPlaceholder={updatedData.username}
            inputType="text"
            val={updatedData.username}
            onChange={handleProfileChange}
            error={errors.username}
          />
          {/* {updatedData.username && <Text>{errors.username}</Text>} */}
        </FormControl>
        <FormControl>
          {/* <FormLabel>Update Email</FormLabel> */}
          {/* <Input
            value={updatedData.email}
            type="email"
            placeholder={email}
            onChange={(e) => handleProfileChange("email", e.target.value)}
          /> */}
          <IconInput
            icon={<FaEnvelope />}
            labelText="Update Email:"
            labelFor="email"
            inputPlaceholder={updatedData.email}
            inputType="email"
            val={updatedData.email}
            onChange={handleProfileChange}
            error={errors.email}
          />
          {/* {updatedData.email && <Text>{errors.email}</Text>} */}
        </FormControl>
        <FormControl>
          {/* <FormLabel>Update Password</FormLabel> */}
          {/* <Input
            value={updatedData.password}
            type="password"
            onChange={(e) => handleProfileChange("password", e.target.value)}
          /> */}
          <IconInput
            icon={<FaUserShield/>}
            labelText="Update Password:"
            labelFor="password"
            inputPlaceholder={updatedData.password}
            inputType="password"
            val={updatedData.password}
            onChange={handleProfileChange}
            error={errors.password}
          />
          {/* {updatedData.password && <Text> {errors.password}</Text>} */}
        </FormControl>
        <FormControl>
          {/* <FormLabel>Retype New Password</FormLabel> */}
          {/* <Input
            value={updatedData.checkPassword}
            type="password"
            onChange={(e) =>
              handleProfileChange("checkPassword", e.target.value)
            }
          /> */}
          <IconInput
            icon={<FaUserShield />}
            labelText="Retype New Password:"
            labelFor="checkPassword"
            inputPlaceholder={updatedData.checkPassword}
            inputType="checkPassword"
            val={updatedData.checkPassword}
            onChange={handleProfileChange}
          />
          {updatedData.password !== updatedData.checkPassword && (
            <Text>Your passwords must match.</Text>
          )}
        </FormControl>
      </form>
    </Flex>
  );
};

export default EditProfile;
