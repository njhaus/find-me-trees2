import { Box, Image } from "@chakra-ui/react";

interface iTreeImgs {
    imgSrc: string[];
}

const TreeImgs = ({imgSrc}: iTreeImgs) => {
  return (
    <Box
      as={"article"}
      position={{base: 'absolute', lg:'relative'}}
      width={{ base: "25%", md:'20%', lg: "40%" }}
      maxWidth={{ base: "100%", lg: "25rem" }}
      zIndex={5}
      top={{ base: '0', md: '-8rem', lg: '0' }}
      display={{base: 'none', md: 'block'}}
    >
      <Image src={imgSrc[0]} aspectRatio={"1/1"} borderRadius={"50%"} objectFit={'cover'}></Image>
      {/* <Carousel imgs={imgs} /> */}
    </Box>
  );
}

export default TreeImgs
