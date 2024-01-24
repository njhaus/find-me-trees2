import {
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";


import BackButton from "../../components/buttons/BackButton";
import TreeUserOptions from "./TreeUserOptions";

interface iTreeHeading {
    title: string;
    sciName: string;
    id: string;
}

const TreeHeading = ({ title, sciName, id }: iTreeHeading) => {
  return (
    <Flex
      as={"header"}
      direction={{ base: "column", md: "row" }}
      h={"fit-content"}
      pt={"2rem"}
      pb={"5rem"}
      px={"1rem"}
      alignItems={"start"}
      position={"relative"}
    >
      <Box width={{ base: "100%", md: "40%" }}>
        <BackButton to={'/browse'} />
      </Box>
      <VStack width={{ base: "100%", md: "30%" }}>
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
            {title}
          </Heading>
          <Text fontWeight={"200"} fontSize={"3rem"}>
            ~
          </Text>
        </HStack>
        <Heading
          as="h2"
          textAlign={"center"}
          fontWeight={"500"}
          fontSize={"1.5rem"}
          color={"secondary.500"}
        >
          {sciName}
        </Heading>
      </VStack>
      <Box
        as={"aside"}
        width={{ base: "100%", md: "40%" }}
        padding={0}
        height={"100%"}
      >
        <TreeUserOptions id={id} />
      </Box>
    </Flex>
  );
};

export default TreeHeading;
