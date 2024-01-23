import { useState } from "react";

import { Flex, Text, Box } from "@chakra-ui/react";
import HelperText from "../browse/helper_text/HelperText";
import { BsQuestionCircle } from "react-icons/bs";

import { allFilters } from "../../data/browse_data/filterFormData";
import TreeTraitsHelper from "./TreeTraitsHelper";

interface iTreeTraits {
  trait: any;
  label: string;
  icon: JSX.Element;
  // helperText: string;
}

const TreeTraits = ({ trait, label, icon }: iTreeTraits) => {

  const filter = allFilters.filter((h) => h.label === label)[0];
  const helperIdx = filter.values.findIndex(f => f.toLowerCase() === trait)
  const helper =
    helperIdx >= 0
      ? filter.helperText[helperIdx]
      : filter.helperText[0];


  return (
    // Uses the filters array -- which has all descriptions already included in it and a property 'formName' that matches the key for the Traits variable passed in. This way, we can access the explanation for each trait from the filters
    <Flex direction={"row"} alignItems={"center"} mb={"1rem"} flexWrap={"wrap"}>
      <Flex minWidth={"fit-content"} gap={"0.5rem"}>
        <Text color={"main.400"} variant={"smallCaps"} whiteSpace={"nowrap"}>
          {icon}
        </Text>
        <Text color={"main.400"} variant={"smallCaps"} whiteSpace={"nowrap"}>
          {label}:
        </Text>
      </Flex>
      <Flex ms={"0.5rem"} gap={"0.5rem"}>
        <Text color={"main.400"}>
          {label === "Leaf Size"
            ? trait.length > 1
              ? `${trait[0]} - ${trait[1]} inches`
              : `${trait[0]} inches`
            : trait}
        </Text>
        {label !== "Flower Color" && label !== "Leaf Size" && (
          <Box width={"fit-content"} className="filter-icon">
            <Box className="filter-text" maxWidth={"80vw"} overflowX={"scroll"}>
              <TreeTraitsHelper helper={helper} />
            </Box>
            <BsQuestionCircle color={"rgb(144,108,126)"} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default TreeTraits;
