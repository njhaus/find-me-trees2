import { useState } from "react";

import { Flex, Text } from "@chakra-ui/react";
import { iTreeTraitsData } from "../../data/tree_data";
import { BsQuestionCircle } from "react-icons/bs";

import { allFilters } from "../../data/browse_data/filterFormData";

interface iTreeTraits {
  trait: any;
  label: string;
  icon: JSX.Element;
  // helperText: string;
}

const TreeTraits = ({ trait, label, icon }: iTreeTraits) => {
  const [showHelper, setShowHelper] = useState(false);

  return (
    // Uses the filters array -- which has all descriptions already included in it and a property 'formName' that matches the key for the Traits variable passed in. This way, we can access the explanation for each trait from the filters
    <Flex
      direction={"row"}
      alignItems={"center"}
      mb={"1rem"}
      flexWrap={"wrap"}
    >
      <Flex minWidth={"fit-content"}>
        {icon}
        <Text color={"main.400"} variant={"smallCaps"} whiteSpace={"nowrap"}>
          {label}:
        </Text>
      </Flex>
      <Flex ms={'0.5rem'}>
        <Text color={"main.400"}>{trait}</Text>
        <BsQuestionCircle
          color={"rgb(182,195,181)"}
          onClick={() => setShowHelper(!showHelper)}
        />
      </Flex>
      {/* {showHelper && <Text>{helperText}</Text>} */}
    </Flex>
  );
};

export default TreeTraits;
