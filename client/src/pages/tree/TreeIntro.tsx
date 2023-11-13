import { Flex, Heading, Text } from "@chakra-ui/react";

interface itreeIntro {
  text: string;
}

const TreeIntro = ({text}: itreeIntro) => {
  return (
    <Flex>
      <Text>Note: styles here to make text not look so awkward.</Text>
      <Text>{text}</Text>
    </Flex>
  )
}

export default TreeIntro
TreeIntro