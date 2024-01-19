import { Flex, Heading, Text } from "@chakra-ui/react"

interface iTreeUses {
    uses: string;
}

const TreeUses = ({uses }: iTreeUses) => {
  return (
      <Flex as={'article'} direction={'column'}  width={'50%'} padding={'2rem'}>
          <Heading as={'h3'} color={'neutral.500'} fontSize={'2rem'} mx={'auto'} mb={'2rem'}>Uses</Heading>
          <Text>{uses} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nostrum soluta possimus ea illum error expedita deleniti numquam voluptatibus, ad excepturi modi, omnis officiis doloribus pariatur asperiores debitis, repudiandae provident.</Text>
    </Flex>
  )
}

export default TreeUses
