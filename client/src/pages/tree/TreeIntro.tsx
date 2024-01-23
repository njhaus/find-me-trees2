import { Flex, Heading, Text, Box } from "@chakra-ui/react";

interface iTreeIntro {
  text: string;
  title: string;
}

const TreeIntro = ({text, title, }: iTreeIntro) => {
  return (
    <Box
      as={"article"}
      width={{ base: "100%", md:'70%', lg: "40%" }}
      padding={"1rem"}
      gap={"5rem"}
      marginLeft={"1rem"}
    >
      <Heading
        as={"h3"}
        fontSize={"2rem"}
        textAlign={"center"}
        mb={"2rem"}
        color={"neutral.500"}
        maxWidth={'25rem'}
        mx='auto'

      >
        {title} Introduction
      </Heading>
      <Text lineHeight={'1.7rem'} fontWeight={500}>{text}</Text>
    </Box>
  );
}

export default TreeIntro
TreeIntro