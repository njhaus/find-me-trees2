import { Heading, Text, VStack, Flex, Image } from "@chakra-ui/react"

const BrowseTitle = () => {
  return (
    <Flex justifyContent={"space-between"} bg={"purple.400"} padding={'0.5rem'}>
      <VStack align={"start"} flexGrow={"1"}>
        <Heading>Tree Guide</Heading>
        <Text>Use physical features or location to find a tree.</Text>
      </VStack>
      <Image
        src={"../../../src/assets/placeholder-1.jpeg"}
        width={"200px"}
        display={{base: "none", sm: "block"} }
      ></Image>
    </Flex>
  );
}

export default BrowseTitle
