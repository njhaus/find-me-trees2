import { Flex, Text } from '@chakra-ui/react'
import { iTreeTraitsData } from '../browse/data/treeData'
import { leafFilters } from '../browse/data/filterFormData'

interface iTreeTraits {
  traits: iTreeTraitsData
}

const TreeTraits = ({traits }: iTreeTraits) => {
  return (
    <Flex direction={'column'}>
      <Text>Leaf:</Text>
      <Text>Type: {traits.leaf.type}</Text>
      <Text>Shape: {traits.leaf.shape}</Text>
      <Text>Size: {traits.leaf.size}</Text>
      <Text>Branches: {traits.branches}</Text>
      <Text>Fruit: {traits.fruit}</Text>
      <Text>Flower: {traits.flower}</Text>
    </Flex>
  )
}

export default TreeTraits
