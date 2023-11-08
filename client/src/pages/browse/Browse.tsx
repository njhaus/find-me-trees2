import { Flex } from "@chakra-ui/react"


import SearchFilters from "./SearchFilters"
import TreeList from "./TreeList"
import BrowseTitle from "./BrowseTitle"

const Browse = () => {
  return (
    <Flex direction={'column'}>
      <BrowseTitle/>
      <SearchFilters />
      <TreeList/>
    </Flex>
  )
}

export default Browse
