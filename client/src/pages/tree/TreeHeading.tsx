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
    <HStack py={"1rem"}>
      <Box width={"25%"}>
        <Link to={"/browse"}>
          <Button variant="outlineDark">Back to guide</Button>
        </Link>
      </Box>
      <VStack width={"50%"}>
        <Heading
          as="h1"
          textAlign={"center"}
          fontWeight={"200"}
          fontSize={"3rem"}
        >
          {title}
        </Heading>
        <Heading as="h2" textAlign={"center"} fontWeight={"500"}>
          {sciName}
        </Heading>
      </VStack>
      <Box as={"aside"} width={"25%"}>
        <TreeUserOptions id={id} />
      </Box>
    </HStack>
  );
};

export default TreeHeading;
