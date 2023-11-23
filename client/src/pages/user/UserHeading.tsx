import { Flex, Text } from "@chakra-ui/react"

import UserProfile from "./UserProfile";

interface iUserHeading {
  username: string;
  email: string;
}

const UserHeading = ({username, email}: iUserHeading) => {
  return (
    <Flex
      direction={"row"}
      width={"100%"}
      padding={"1rem"}
      justify={"space-between"}
    >
      <Text>{username}'s Trees</Text>
      <Flex
        justify={"center"}
        align={"center"}
        width={"2.5rem"}
        height={"2.5rem"}
        border={"1px solid black"}
        borderRadius={"50%"}
        fontSize={"2rem"}
      >
        <UserProfile userName={username} email={email} />
      </Flex>
    </Flex>
  );
}

export default UserHeading
