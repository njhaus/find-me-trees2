import { Flex, Heading, Text } from "@chakra-ui/react";

const TreeAdaptation = () => {
  return (
    <Flex as={"article"} direction={"column"} width={"50%"} padding={"2rem"}>
      <Heading
        as={"h3"}
        color={"neutral.500"}
        fontSize={"2rem"}
        mx={"auto"}
        mb={"2rem"}
      >
        Adaptation
      </Heading>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ratione dolor nobis esse? Molestiae laboriosam voluptates quibusdam obcaecati nesciunt modi libero quidem id eos dolores enim tempore, a omnis recusandae.</Text>
    </Flex>
  );
}

export default TreeAdaptation
