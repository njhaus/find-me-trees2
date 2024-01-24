import { Flex, Text, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BrowseRedirect = () => {
  return (
    <Flex
      direction={"column"}
      bg={"secondary.100"}
      height={"calc(100vh - 10rem)"}
      color="white"
      justifyContent={"center"}
      alignItems={"center"}
      gap={"2rem"}
    >
      <Heading color="white">404</Heading>
      <Text color="white">
        Nothing found here. Return to the browse page to find trees!
      </Text>
      <Link to={"/browse"}>
        <Button variant={"solidLight"}>Find Me Trees</Button>
      </Link>
    </Flex>
  );
};

export default BrowseRedirect;
