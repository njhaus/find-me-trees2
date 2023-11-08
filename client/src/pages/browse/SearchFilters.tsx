import { Text, Flex, Button, Heading } from "@chakra-ui/react"

import FilterInfo from "./filters/FilterInfo";
import PhysicalIcon from "./filters/PhysicalIcon";
import MapIcon from "./filters/MapIcon";


const SearchFilters = () => {
  return (
    <Flex as={"section"} direction={"column"}>
      <Flex direction={"row"}>
        <Flex direction={"column"}>
          <Heading as={"h5"} size={"md"}>
            Physical features
          </Heading>
          <Flex direction={'row'}>
            <PhysicalIcon />
            <PhysicalIcon />
            <PhysicalIcon />
            <PhysicalIcon />
          </Flex>
        </Flex>
        <Flex direction={"column"}>
          <Heading as={"h5"} size={"md"}>
            Map
          </Heading>
          <MapIcon />
        </Flex>
      </Flex>
      {/* Show portion of the form that goes with each icon/map */}
      <FilterInfo />
      <Button>Find Me Trees</Button>
    </Flex>
  );
}

export default SearchFilters
