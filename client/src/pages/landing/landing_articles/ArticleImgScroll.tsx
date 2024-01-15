import { Box, Image } from "@chakra-ui/react"


interface ArticleImgScrollProps {
    imgs: string[]
    visibleImg: number
}

const ArticleImgScroll = ({imgs, visibleImg}: ArticleImgScrollProps) => {
  return (
    <Box
      width={"35%"}
      height={"100%"}
      display={{ base: "none", md: "block" }}
      zIndex={"1"}
      marginLeft={"auto"}
      position={"absolute"}
      right={"22%"}
      transform={'translateX(50%)'}
      top={"0"}
      paddingTop={"40vh"}
      bg={"transparent"}
      maxWidth={"30rem"}
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
