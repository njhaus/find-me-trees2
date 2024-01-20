import { Flex, Heading, Text, HStack, Box } from "@chakra-ui/react"

import UserProfile from "./UserProfile";
import BackButton from "../../components/buttons/BackButton";
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
      <Box>
        <BackButton to={"/browse"} />
      </Box>
      <HStack>
        <Text fontWeight={"200"} fontSize={"3rem"}>
          ~
        </Text>
        <Heading
          as="h1"
          textAlign={"center"}
          fontWeight={"200"}
          fontSize={"3rem"}
          color={"main.200"}
        >
          {userData.username}'s Trees
        </Heading>
        <Text fontWeight={"200"} fontSize={"3rem"}>
          ~
        </Text>
      </HStack>
      <Flex
        justify={"center"}
        align={"center"}
        width={"2.5rem"}
        height={"2.5rem"}
        border={"1px solid black"}
        borderRadius={"50%"}
        fontSize={"2rem"}
      >
        <UserProfile userData={userData} />
      </Flex>
    </Flex>
  );
}

export default UserHeading
