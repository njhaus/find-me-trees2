import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import RedwoodBg from "../../components/backgrounds/RedwoodBg";

const BrowseTitle = () => {
  return (
    <Flex
      position={"relative"}
      justifyContent={"space-between"}
      background={"secondary.100"}
      padding={"0.5rem"}
      width={"100%"}
      height={"10rem"}
      overflow={"hidden"}
    >
      <RedwoodBg/>
      <VStack align={"start"} zIndex={1} padding={"2rem"}>
        <Heading as="h2" color={"white"} textShadow={"0px 0px 2px black"}>
          Tree Guide
        </Heading>
        <Text color={"white"} textShadow={"0px 0px 2px black"}>
          Search for trees by name, physical features, or location.
        </Text>
      </VStack>
    </Flex>
  );
}

export default BrowseTitle
