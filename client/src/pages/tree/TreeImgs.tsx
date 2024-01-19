import { Box, Image } from "@chakra-ui/react";

interface iTreeImgs {
    imgSrc: string[];
}

const TreeImgs = ({imgSrc}: iTreeImgs) => {
  return (
    <Box
      as={"article"}
      width={{ base: "100%", md: "40%" }}
      maxWidth={{ base: "100%", md: "25rem" }}
      maxHeight={{ base: "100vh", md: "80vh" }}
      zIndex={5}
    >
      <Image src={imgSrc[0]} aspectRatio={"1/1"} borderRadius={"50%"} objectFit={'cover'}></Image>
      {/* <Carousel imgs={imgs} /> */}
    </Box>
  );
}

export default TreeImgs
