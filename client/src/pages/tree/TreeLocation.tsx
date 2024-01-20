import { Flex, Box, Text, Heading } from "@chakra-ui/react";

import { UsState } from "../../data/tree_data";
import { BsFill0SquareFill } from "react-icons/bs";

interface iTreeLocation {
  title: string;
  location: UsState[];
}

const TreeLocation = ({ title, location }: iTreeLocation) => {
  return (
    <Flex
      className="blur-border"
      direction={"column"}
      alignItems={"center"}
      as={"article"}
      width={{ base: "100%", md: "calc(60% - 4rem)" }}
      bg={"white"}
      mx={"2rem"}
      my={"2rem"}
      p={"1rem"}
      borderRadius={"10px"}
    >
      <Heading as={"h2"} color={"main.300"}>
        Distribution
      </Heading>
      <Box>Map goes here</Box>
      <Flex gap={"2rem"}>
        <Flex gap={"0.5rem"}>
          <BsFill0SquareFill color={"blue"} />
          <Text color={"main.300"} variant={"smallCaps"}>
            Native
          </Text>
        </Flex>
        <Flex gap={"0.5rem"}>
          <BsFill0SquareFill color={"red"} />
          <Text color={"main.300"} variant={"smallCaps"}>
            Invasive
          </Text>
        </Flex>
      </Flex>
      <Flex gap={"0.5rem"}>
        <Text variant={"smallCaps"} color={"main.300"}>
          Found in:
        </Text>
        {location.map((loc, i) => (
          <Text
            key={i}
            display={"inline"}
            color={"main.300"}
            fontSize={"0.9rem"}
          >
            {loc} {i < location.length - 1 && ","}{" "}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default TreeLocation;
