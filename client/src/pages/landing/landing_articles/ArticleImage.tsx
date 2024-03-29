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
      position={'relative'}
      height={'50%'}
    >
      <Image
        display={{ base: "block", md: "none" }}
        maxWidth={"90%"}
        maxHeight={"25rem"}
        src={imgUrl}
        pb={'1rem'}
      ></Image>
    </Flex>
  );
}

export default ArticleImage
