import { Flex, Heading, Text, Box } from "@chakra-ui/react";

interface iTreeIntro {
  text: string;
  title: string;
}

const TreeIntro = ({text, title, }: iTreeIntro) => {
  return (
    <Box
      as={"article"}
      width={{ base: "80%", md: "40%" }}
      maxWidth={{ base: "100%", md: "calc(60% - 1rem)" }}
      maxHeight={{ base: "100vh", md: "80vh" }}
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
      >
        {title} Introduction
      </Heading>
      <Text lineHeight={'1.7rem'} fontWeight={500}>{text}</Text>
    </Box>
  );
}

export default TreeIntro
TreeIntro