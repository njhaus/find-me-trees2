import { Flex, Heading, VStack, Text, Image } from '@chakra-ui/react'

interface iAboutSection {
    direction: 'row' | 'row-reverse';
}

const AboutSection = ({direction}: iAboutSection) => {
  return (
      <Flex as={'section'} direction={direction} justifyContent={'space-evenly'} alignItems={'center'} m={'1rem'} gap={'2rem'}>
          <VStack as={'article'} className='about-text'>
              <Heading as={'h3'}>Lorem Ipsum</Heading>
              <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque omnis eligendi beatae. Consequuntur obcaecati, magnam nam velit, distinctio nobis architecto accusamus soluta tenetur ab aperiam temporibus. Deleniti incidunt magni dolore!</Text>
          </VStack>
          <Image className='about-img' src={'/tree-hands.jpeg'} objectFit={'cover'} borderRadius={'50%'} width={'10rem'} aspectRatio={'1/1'}></Image>
    </Flex>
  )
}

export default AboutSection
