import { Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const BrowseRedirect = () => {
  return (
      <Flex direction={'column'}>
          <Text>Which tree are you looking for? Return to the browse page to find trees!</Text>
          <Link to={'/browse'}>Find Me Trees</Link>
    </Flex>
  )
}

export default BrowseRedirect
