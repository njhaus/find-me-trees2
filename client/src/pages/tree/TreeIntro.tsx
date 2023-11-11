import { Flex, Text } from "@chakra-ui/react";

interface itreeIntro {
  text: string;
}

const TreeIntro = ({text}: itreeIntro) => {
  return (
    <Flex>
      <Text>{text}</Text>
    </Flex>
  )
}

export default TreeIntro
TreeIntro