import { Box, Flex, Image } from '@chakra-ui/react'

interface iCarousel {
    imgs: string[];
}

const Carousel = ({ imgs }: iCarousel) => {
  return (
      <Box>
          <Flex>
              {imgs.map((img, i) => (
                  <Image key={ i } src={img }></Image>
              ))}
          </Flex>
    </Box>
  )
}

export default Carousel
