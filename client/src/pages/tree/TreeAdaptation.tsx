import { Flex, Heading, Text } from "@chakra-ui/react";

const TreeAdaptation = () => {
  return (
    <Flex
      as={"article"}
      direction={"column"}
      width={{ base: "100%", md: "calc(50%)" }}
      py={{ base: "2rem", md: 0 }}
      px={{ base: 0, md: "3rem" }}
      mx={{ base: "3rem", md: 0 }}
      my={{ base: 0, md: '2rem' }}
      borderLeft={{ base: "none", md: "1px solid white" }}
      borderTop={{ base: "1px solid white", md: "none" }}
    >
      <Heading
        as={"h3"}
        color={"neutral.500"}
        fontSize={"2rem"}
        mx={"auto"}
        mb={"2rem"}
      >
        Adaptation
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        ratione dolor nobis esse? Molestiae laboriosam voluptates quibusdam
        obcaecati nesciunt modi libero quidem id eos dolores enim tempore, a
        omnis recusandae.
      </Text>
    </Flex>
  );
}

export default TreeAdaptation
