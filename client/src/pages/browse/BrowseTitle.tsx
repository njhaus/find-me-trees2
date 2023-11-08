import { Heading, Text, VStack } from "@chakra-ui/react"

const BrowseTitle = () => {
  return (
      <VStack bg={'purple.400'} align={'start'}>
          <Heading>Tree Guide</Heading>
          <Text>Use physical features or location to find a tree.</Text>
    </VStack>
  )
}

export default BrowseTitle
