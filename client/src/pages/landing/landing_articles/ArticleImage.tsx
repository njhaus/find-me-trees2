import { Flex, Image } from "@chakra-ui/react";

interface ArticleImageProps {
    imgUrl: string;
}

const ArticleImage = ({ imgUrl }: ArticleImageProps) => {
  return (
    <Flex
      bg={"transparent"}
      width={"35%"}
      flexGrow={{ base: "1", md: "0" }}
      alignItems={"center"}
      justifyContent={"center"}
      overflowX={'hidden'}
    >
      <Image
        display={{ base: "block", md: "none" }}
        maxWidth={"30rem"}
        maxHeight={'50vh'}
        src={imgUrl}
      ></Image>
    </Flex>
  );
}

export default ArticleImage
