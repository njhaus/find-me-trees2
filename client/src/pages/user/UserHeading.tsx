import { Flex, Text } from "@chakra-ui/react"

import UserProfile from "./UserProfile";
import { iUserData } from "../../data/user_data/userData";

interface iUserHeading {
  userData: iUserData
}

const UserHeading = ({userData}: iUserHeading) => {
  return (
    <Flex
      direction={"row"}
      width={"100%"}
      padding={"1rem"}
      justify={"space-between"}
    >
      <Text>{userData.username}'s Trees</Text>
      <Flex
        justify={"center"}
        align={"center"}
        width={"2.5rem"}
        height={"2.5rem"}
        border={"1px solid black"}
        borderRadius={"50%"}
        fontSize={"2rem"}
      >
        <UserProfile userData = {userData} />
      </Flex>
    </Flex>
  );
}

export default UserHeading
