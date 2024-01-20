import { Flex, Heading, Text } from "@chakra-ui/react"

interface iTreeUses {
    uses: string;
}

const TreeUses = ({uses }: iTreeUses) => {
  return (
    <Flex
      as={"article"}
      direction={"column"}
      width={{ base: "100%", md: "50%" }}
      py={{ base: "2rem", md: 0 }}
      px={{ base: 0, md: "3rem" }}
      mx={{ base: "3rem", md: 0 }}
      my={{ base: 0, md: "2rem" }}
    >
      <Heading
        as={"h3"}
        color={"neutral.500"}
        fontSize={"2rem"}
        mx={"auto"}
        mb={"2rem"}
      >
        Uses
      </Heading>
      <Text>
        {uses} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
        nostrum soluta possimus ea illum error expedita deleniti numquam
        voluptatibus, ad excepturi modi, omnis officiis doloribus pariatur
        asperiores debitis, repudiandae provident.
      </Text>
    </Flex>
  );
}

export default TreeUses
