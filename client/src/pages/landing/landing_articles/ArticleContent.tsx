
import {
    Flex,
    Heading,
    Text,
    Button,
    Box
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import Boundary from "../../../components/ui-components/Boundary";

interface ArticleContentProps {
    title: string;
    description: string;
  cta: string;
  link: string;
    children?: JSX.Element[];
}

const ArticleContent = ({title, description, link, cta}: ArticleContentProps) => {
  return (
    <Flex
      direction={"column"}
      width={"60%"}
      minWidth={{ base: "100%", sm: "31.2rem" }}
      maxWidth={{ base: "100vw", md: "40rem" }}
      flexGrow={"2"}
      justifyContent={"center"}
      flexWrap={"nowrap"}
      position={"relative"}
      gap={"2rem"}
      px={"2rem"}
      pt={"5%"}
      pb={"10%"}
    >
      <Flex direction={"column"} gap={"1rem"}>
        <Heading
          as={"h3"}
          size={"2xl"}
          color={"white"}
          fontFamily={"main"}
          fontWeight={"700"}
          mb={"1rem"}
        >
          {title}
        </Heading>
        <Boundary color={"white"} width={"75%"} />
        <Box maxWidth={"100%"}>
          <Text
            maxWidth={"100%"}
            whiteSpace={"normal"}
            fontFamily={"main"}
            color={"main.900"}
            fontSize={"1.25rem"}
            mt={"1rem"}
          >
            {description}
          </Text>
        </Box>
      </Flex>
      <Link to={link}>
        <Button whiteSpace={"normal"} w={"12rem"}>
          {cta}
        </Button>
      </Link>
    </Flex>
  );
}

export default ArticleContent
