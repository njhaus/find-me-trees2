
import { Flex, Box, Text } from "@chakra-ui/react";

import { UsState } from "../browse/data/treeData"

interface iTreeLocation {
  location: UsState[];
}

const TreeLocation = ({location}: iTreeLocation) => {
  return (
    <Flex>
      <Box>
        Map goes here
      </Box>
      <Text>Found in: </Text>
      {location.map((loc, i) => (
        <Text key={i}>{loc}</Text>
      ))}
    </Flex>
  )
}

export default TreeLocation
