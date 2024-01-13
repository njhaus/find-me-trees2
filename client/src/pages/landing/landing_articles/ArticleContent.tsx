
import {
    Flex,
    Heading,
    Text,
    Button,
    Box
} from "@chakra-ui/react";

interface ArticleContentProps {
    title: string;
    description: string;
    cta: string;
    children?: JSX.Element[];
}

const ArticleContent = ({title, description, cta}: ArticleContentProps) => {
  return (
    <Flex
      direction={"column"}
      width={"60%"}
      minWidth={{ base: "100%", sm: "31.2rem" }}
      maxWidth={"100vw"}
      flexGrow={"2"}
      justifyContent={"center"}
      flexWrap={"nowrap"}
      position={"relative"}
      gap={"2rem"}
      px={"2rem"}
      pb={"5%"}
    >
      <Flex direction={"column"} gap={"1rem"}>
        <Heading
          as={"h3"}
          size={"2xl"}
          color={"white"}
          fontFamily={"main"}
          fontWeight={"700"}
        >
          {title}
        </Heading>
        {/* {children} */}
        <Box maxWidth={"100%"}>
          <Text
            maxWidth={"100%"}
            whiteSpace={"normal"}
            fontFamily={"main"}
            color={"main.900"}
            fontSize={"1.25rem"}
          >
            {description}
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent={"flex-end"} width={"25%"}>
        <Button whiteSpace={"normal"}>{cta}</Button>
      </Flex>
    </Flex>
  );
}

export default ArticleContent
