import { Text, Flex, Button, Heading, CloseButton } from "@chakra-ui/react"

import { useState } from "react";

import FilterInfo from "./filters/FilterInfo";
import PhysicalIcon from "./filters/PhysicalIcon";
import MapIcon from "./filters/MapIcon";

// data
import { filters, mapFilter } from "./data/filterData";

// styles
import { iconHeadingProps as ihp } from "./styles/browseStyles";

const SearchFilters = () => {

  // STATE: filter icon clicked on determines which info child to display
  const [showFilter, setShowFilter] = useState(-1);
  
  const currentFilter = showFilter >= 0 && showFilter < filters.length
    ? filters[showFilter]
    : showFilter === filters.length
      ? mapFilter
      : null;

  console.log(mapFilter);

  function handleFilter(id: number) {
    setShowFilter(id)
  }

  return (
    <Flex as={"section"} direction={"column"}>
      <Flex direction={"row"} justify={"space-around"} padding={"0.5rem 1rem"}>
        <Flex direction={"column"} flexGrow={"1"}>
          <Heading
            as={ihp.as}
            size={ihp.size}
            marginBottom={ihp.marginBottom}
            textAlign={ihp.textAlign}
          >
            Physical features
          </Heading>
          <Flex direction={"row"} justify={"space-evenly"}>
            {filters.map((f, i) => (
              <PhysicalIcon
                key={i}
                id={i}
                icon={f.icon}
                color={f.color}
                onClick={handleFilter}
                currentFilter={showFilter}
              />
            ))}
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          width={"25%"}
          minWidth={"5rem"}
          align={"center"}
        >
          <Heading
            as={ihp.as}
            size={ihp.size}
            marginBottom={ihp.marginBottom}
            textAlign={ihp.textAlign}
          >
            Map
          </Heading>
          <MapIcon
            id={filters.length}
            onClick={handleFilter}
          />
        </Flex>
      </Flex>
      {/* Show portion of the form that goes with each icon/map */}
      <FilterInfo>
        {currentFilter && currentFilter.dropDown}
        {currentFilter && <CloseButton onClick={() => handleFilter(-1)} />}
      </FilterInfo>
      <Button>Find Me Trees</Button>
    </Flex>
  );
}

export default SearchFilters
