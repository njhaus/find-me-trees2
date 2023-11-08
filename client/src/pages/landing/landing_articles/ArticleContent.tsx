
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

const ArticleContent = ({title, description, cta, children}: ArticleContentProps) => {
  return (
    <Flex
      direction={"row"}
      bg={"blue.100"}
      width={'60%'}
      minWidth={'31.2rem'}
      flexGrow={"2"}
      justifyContent={"space-between"}
      flexWrap={"nowrap"}
      position={'relative'}
    >
      <Flex direction={"column"} width={"50%"}>
        <Heading as={"h3"} size={"md"}>
          {title}
        </Heading>
        {children}
        <Box maxWidth={"100%"}>
          <Text maxWidth={"100%"} whiteSpace={"normal"}>
            {description}
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent={'flex-end'} width={"25%"}>
        <Button whiteSpace={"normal"}>{cta}</Button>
      </Flex>
    </Flex>
  );
}

export default ArticleContent
