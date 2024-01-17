import { FormEvent, useState, useEffect, useRef } from "react";

import { Flex, Button, Heading, CloseButton, Text, Box } from "@chakra-ui/react";

import FilterInfo from "./search_filters/FilterInfo";
import PhysicalIcon from "./search_filters/PhysicalIcon";
import MapIcon from "./search_filters/MapIcon";
import NameFilter from "./search_filters/NameFilter";
import Boundary from "../../components/ui-components/Boundary";

// data
import { filters, mapFilter } from "../../data/browse_data/filterData";

// styles
import { iconHeadingProps as ihp } from "./styles/browseStyles";

interface SearchFiltersProps {
  onSubmit: (e: FormEvent) => void;
}

const SearchFilters = ({ onSubmit }: SearchFiltersProps) => {
  // STATE: filter icon clicked on determines which info child to display. -1 shows nothing, map is set to filters.length so it is always the last.
  const [showFilter, setShowFilter] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulate form submit, rerender form, show 'searching for trees'
  useEffect(() => {
    if (isSubmitting === true) {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  }, [isSubmitting]);

  // Current filter shows inputs for current filter -- inputs are found
  const currentFilter =
    showFilter >= 0 && showFilter < filters.length
      ? filters[showFilter]
      : showFilter === filters.length
      ? mapFilter
      : null;

  function handleFilter(id: number) {
    if (id === showFilter) setShowFilter(-1);
    else setShowFilter(id);
  }

  return (
    <Box bg={"white"} border={"1rem solid rgb(213,226,212)"}>
      {isSubmitting ? (
        <Text>Finding trees!</Text>
      ) : (
        <form>
          <Flex direction={"column"} padding={{ base: 3, md: 6 }}>
            {/* Filter by tree name */}
            <Heading
              as={ihp.as}
              size={ihp.size}
              marginBottom={ihp.marginBottom}
              textAlign={ihp.textAlign}  
            >
              Search by Name
            </Heading>
            <NameFilter />
            <Flex
              direction={"row"}
              justify={"space-around"}
                padding={"0.5rem 1rem"}
                mt={'2rem'}
            >
              <Flex direction={"column"} flexGrow={"1"}>
                {/* Physical Features Icons */}
                <Heading
                  as={ihp.as}
                  size={ihp.size}
                  marginBottom={ihp.marginBottom}
                  textAlign={ihp.textAlign}
                >
                  Search by Physical features
                </Heading>
                {/* Map all of the filter icons */}
                <Flex direction={"row"} justify={"space-evenly"}>
                  {filters.map((f, i) => (
                    <PhysicalIcon
                      key={i}
                      title={f.title}
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
                {/* Map / Location icon */}
                <Heading
                  as={ihp.as}
                  size={ihp.size}
                  marginBottom={ihp.marginBottom}
                  textAlign={ihp.textAlign}
                >
                  Search by Location
                </Heading>
                <MapIcon id={filters.length} onClick={handleFilter} />
              </Flex>
            </Flex>
            {/* Show portion of the form that goes with each icon/map and show/hide on click (useState -- showfilter) */}
            <Box position="relative">
              <FilterInfo>
                {currentFilter && currentFilter.dropDown}
                {currentFilter && (
                  <CloseButton
                    position={"absolute"}
                    right={"0rem"}
                    top={0}
                    onClick={() => handleFilter(-1)}
                  />
                )}
              </FilterInfo>
            </Box>
            <Box mx={'auto'} w={'90%'} mt={'1rem'}>
              <Boundary width={"100%"} color={"main.900"}></Boundary>
            </Box>
            <Box mt={"1rem"} mx={"auto"}>
              <Button
                width={"fit-content"}
                variant={"solidDark"}
                onClick={(e) => {
                  onSubmit(e);
                  setIsSubmitting(true);
                  handleFilter(-1);
                }}
              >
                Find Me Trees
              </Button>
            </Box>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default SearchFilters;
