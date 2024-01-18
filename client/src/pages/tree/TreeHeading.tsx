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
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import TreeUserOptions from "./TreeUserOptions";

interface iTreeHeading {
    title: string;
    sciName: string;
    id: string;
}

const TreeHeading = ({ title, sciName, id }: iTreeHeading) => {
  return (
    <HStack py={"2rem"} px={"1rem"}>
      <Box width={"30%"}>
        <Link to={"/browse"}>
          <Button variant="outlineDark">Back to guide</Button>
        </Link>
      </Box>
      <VStack width={"40%"}>
        <Heading
          as="h1"
          textAlign={"center"}
          fontWeight={"200"}
          fontSize={"3rem"}
          color={"main.200"}
        >
          ~ {title} ~
        </Heading>
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
      <Box as={"aside"} width={"30%"} padding={0} height={'100%'}>
        <TreeUserOptions id={id} />
      </Box>
    </HStack>
  );
};

export default TreeHeading;
