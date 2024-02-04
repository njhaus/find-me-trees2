import { Flex, Heading, Image, HStack, Box } from "@chakra-ui/react";

import UserProfile from "./UserProfile";
import BackButton from "../../components/buttons/BackButton";
import { iUserData } from "./user_data/userData";

interface iUserHeading {
  userData: iUserData;
}

const UserHeading = ({ userData }: iUserHeading) => {
  // Need dynamic style based on length of username for heading fontsize

  return (
    <Flex
      position={"relative"}
      direction={"row"}
      width={"100%"}
      padding={"1rem"}
      justify={"space-between"}
      h={"10rem"}
    >
      <Box>
        <BackButton to={"/browse"} />
      </Box>
      <HStack>
        <Heading
          as="h1"
          textAlign={"center"}
          fontWeight={"500"}
          fontSize={{
            base: `${
              2.5 -
              (userData.username.length > 10
                ? userData.username.length * 0.04
                : 0)
            }rem`,
            md: `${
              3 -
              (userData.username.length > 10
                ? userData.username.length * 0.025
                : 0)
            }rem`,
          }}
          fontFamily={"display"}
          color={"secondary.100"}
          pb={"2rem"}
          position={"relative"}
          me={{ base: "0rem", md: "4rem" }}
          whiteSpace={"nowrap"}
        >
          {userData.username.slice(0, 1)[0].toUpperCase() +
            userData.username.slice(1)}
          's Trees
          <Image
            src={"/user/curved-line-leaf.png"}
            position={"absolute"}
            right={{
              base: `-${2.75 + userData.username.length * 0.05}rem`,
              md: `-${3.75 + userData.username.length * 0.1}rem`,
            }}
            bottom={"-0.5rem"}
          ></Image>
        </Heading>
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
};

export default UserHeading;
