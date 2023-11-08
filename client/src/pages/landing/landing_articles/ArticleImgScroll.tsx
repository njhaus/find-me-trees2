import { Box, Image } from "@chakra-ui/react"


interface ArticleImgScrollProps {
    imgs: string[]
    visibleImg: number
}

const ArticleImgScroll = ({imgs, visibleImg}: ArticleImgScrollProps) => {
  return (
    <Box
      bg={"green.400"}
      width={"35%"}
      height={"100%"}
      display={{ base: "none", md: "block" }}
      zIndex={"1"}
      marginLeft={"auto"}
      position={"absolute"}
      right={"0"}
      top={"0"}
      paddingTop={'40vh'}
    >
      <Image
        position={"sticky"}
        top={"45vh"}
        transform={"translateY(-50%)"}
        src={imgs[visibleImg]}
      ></Image>
    </Box>
  );
}

export default ArticleImgScroll
