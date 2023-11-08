import { Flex, Image, Text } from "@chakra-ui/react";

interface ArticleImageProps {
    imgUrl: string;
}

const ArticleImage = ({ imgUrl }: ArticleImageProps) => {
  return (
    <Flex
      bg={"blue.300"}
      width={"35%"}
      flexGrow={{ base: "1", md: "0" }}
      alignItems={"center"}
      justifyContent={"end"}
    >
      <Image
        display={{ base: "block", md: "none" }}
        src={imgUrl}
      ></Image>
    </Flex>
  );
}

export default ArticleImage
