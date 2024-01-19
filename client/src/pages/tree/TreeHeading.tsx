import {
  Flex,
  Heading,
  Image,
  Box,
  Spinner,
  Skeleton,
  Stack,
  HStack,
  VStack,
  Button,
  Text
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import TreeUserOptions from "./TreeUserOptions";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface iTreeHeading {
    title: string;
    sciName: string;
    id: string;
}

const TreeHeading = ({ title, sciName, id }: iTreeHeading) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      py={"2rem"}
      px={"1rem"}
      alignItems={"start"}
      position={ 'relative'}
    >
      <Box width={{ base: "100%", md: "40%" }}>
        <Link to={"/browse"}>
          <Button variant="outlineDark" display={{ base: "none", md: "block" }}>
            Back to guide
          </Button>
          <Button variant="icon" display={{ base: "block", md: "none" }} position={'absolute'} top={'1rem'} left={ '1rem'}>
            <ArrowBackIcon />
          </Button>
        </Link>
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
