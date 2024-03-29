import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      bg={"main.900"}
      zIndex={"1"}
      p={"1rem"}
      gap={"1rem"}
    >
      <Image
        className="learn-more-img"
        src="/tree-hands.jpeg"
        w={"15rem"}
        h={"15rem"}
        borderRadius={"50%"}
        ms={"2rem"}
        mt={{base: "1rem", md:"-2rem"}}
      ></Image>
      <VStack mx={"2rem"} align={"start"}>
        <Heading as={"h4"} color={"main.100"} mb={"1rem"}>
          Love our forests
        </Heading>
        <Text color={"main.100"} mb={"1rem"}>
          The first step to protecting our forests is getting to know them! Find
          Me Trees is dedicated to spreading love for the environment, one tree
          at a time.
        </Text>
        <Link to={"/about"}>
          <Button variant={'outlineDark'}>Learn more!</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default LearnMore;
