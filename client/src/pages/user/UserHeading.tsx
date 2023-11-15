import { Flex, Text, Box } from "@chakra-ui/react"

import UserProfile from "./UserProfile";

interface iUserHeading {
  userName: string;
  email: string;
}

const UserHeading = ({userName, email}: iUserHeading) => {
  return (
    <Flex
      direction={"row"}
      width={"100%"}
      padding={"1rem"}
      justify={"space-between"}
    >
      <Text>{userName}'s Trees</Text>
      <Flex
        justify={"center"}
        align={"center"}
        width={"2.5rem"}
        height={"2.5rem"}
        border={"1px solid black"}
        borderRadius={"50%"}
        fontSize={"2rem"}
      >
        <UserProfile userName={userName} email={email} />
      </Flex>
    </Flex>
  );
}

export default UserHeading
