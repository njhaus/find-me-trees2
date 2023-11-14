import { FormEvent, useState, useEffect, useRef } from "react";

import { Flex, Button, Heading, CloseButton, Text } from "@chakra-ui/react";

import FilterInfo from "./search_filters/FilterInfo";
import PhysicalIcon from "./search_filters/PhysicalIcon";
import MapIcon from "./search_filters/MapIcon";
import NameFilter from "./search_filters/NameFilter";

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
    <>
      {isSubmitting ? (
        <Text>Finding trees!</Text>
      ) : (
        <form>
          <Flex direction={"column"} padding={{ base: 3, md: 6 }}>
            {/* Filter by tree name */}
              <NameFilter />
            <Flex
              direction={"row"}
              justify={"space-around"}
              padding={"0.5rem 1rem"}
            >
              <Flex direction={"column"} flexGrow={"1"}>
                {/* Physical Features Icons */}
                <Heading
                  as={ihp.as}
                  size={ihp.size}
                  marginBottom={ihp.marginBottom}
                  textAlign={ihp.textAlign}
                >
                  Physical features
                </Heading>
                {/* Map all of the filter icons */}
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
                {/* Map / Location icon */}
                <Heading
                  as={ihp.as}
                  size={ihp.size}
                  marginBottom={ihp.marginBottom}
                  textAlign={ihp.textAlign}
                >
                  Map
                </Heading>
                <MapIcon id={filters.length} onClick={handleFilter} />
              </Flex>
            </Flex>
            {/* Show portion of the form that goes with each icon/map and show/hide on click (useState -- showfilter) */}
            <FilterInfo>
              {currentFilter && currentFilter.dropDown}
              {currentFilter && (
                <CloseButton onClick={() => handleFilter(-1)} />
              )}
            </FilterInfo>
            <Button
              width={"fit-content"}
              onClick={(e) => {
                onSubmit(e);
                setIsSubmitting(true);
              }}
            >
              Find Me Trees
            </Button>
          </Flex>
        </form>
      )}
    </>
  );
};

export default SearchFilters;
