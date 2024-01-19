import { Box, Image } from "@chakra-ui/react";

interface iTreeImgs {
  imgSrc: string[];
}

const TreeImgMobile = ({imgSrc }: iTreeImgs) => {
  return (
    <Box
      as={"article"}
      width={"80%"}
      mx={"auto"}
      zIndex={5}
      display={{ base: "block", md: "none" }}
    >
      <Image
        src={imgSrc[0]}
        className="blur-border"
        aspectRatio={"4/3"}
        borderRadius={"10px"}
        objectFit={"cover"}
      ></Image>
      {/* <Carousel imgs={imgs} /> */}
    </Box>
  );
};

export default TreeImgMobile;
