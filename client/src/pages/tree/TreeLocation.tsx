
import { Flex, Box, Text, Heading } from "@chakra-ui/react";

import { UsState } from "../browse/data/treeData"

interface iTreeLocation {
  title: string;
  location: UsState[];
}

const TreeLocation = ({title, location}: iTreeLocation) => {
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Heading as={"h2"}>{title} is found in: </Heading>
      <Box>
        {location.map((loc, i) => (
          <Text key={i} display={"inline"}>
            {loc} {i < location.length - 1 && ","}{" "}
          </Text>
        ))}
      </Box>
      <Box>Map goes here</Box>
      <Flex>Map key goes here</Flex>
    </Flex>
  );
}

export default TreeLocation
