import {
  FormControl,
  FormLabel,
  FormErrorMessage,
    FormHelperText,
    Input,
  Flex
} from "@chakra-ui/react";


interface iEditProfile {
  userName: string;
  email: string;
}
    

const EditProfile = ({userName, email}: iEditProfile) => {

  return (
    <Flex>
      <form>
        <FormControl>
          <FormLabel>Update Email</FormLabel>
          <Input type="email" placeholder={email} />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Update Username</FormLabel>
          <Input type="text" placeholder={userName} />
        </FormControl>
        <FormControl>
          <FormLabel>Update Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Retype New Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Type your current password to save changes:</FormLabel>
          <Input type="password" />
        </FormControl>
      </form>
    </Flex>
  );
};

export default EditProfile;
