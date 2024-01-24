import { Flex, Heading } from "@chakra-ui/react";

import { BsFlower1, BsPinMap, BsRulers } from "react-icons/bs";
import { GiLeafSkeleton, GiOakLeaf, GiShinyApple, GiTreeBranch, GiTreeFace } from "react-icons/gi";
import { allFilters } from "../../data/browse_data/filterFormData";
import TreeTraits from "./TreeTraits";
import { iTreeTraitsData } from "./data/tree_data";

interface iTreeTraitsSection {
  traits: iTreeTraitsData;
}

const traitIconMap: Record<keyof iTreeTraitsData, JSX.Element> = {
  leafType: <GiLeafSkeleton color={"green"} />,
  leafShape: <GiOakLeaf color={"green"} />,
  leafSize: <BsRulers color={"green"} />,
  bark: <GiTreeFace color={"green"} />,
  branches: <GiTreeBranch color={"green"} />,
  fruit: <GiShinyApple color={"green"} />,
  flower: <BsFlower1 color={"green"} />,
  location: <BsPinMap color={"green"} />,
};

const TreeTraitsSection = ({ traits }: iTreeTraitsSection) => {
  return (
    <Flex
      as={"article"}
      className="blur-border"
      width={{ base: "100%", md: "calc(40% - 4rem)" }}
      minWidth={"15rem"}
      direction={"column"}
      bg={"white"}
      mx={"2rem"}
      my={"2rem"}
      p={"1rem"}
      borderRadius={"10px"}
    >
      <Heading
        as={"h3"}
        fontSize={"2rem"}
        color={"main.300"}
        mb={"1rem"}
        mx={"auto"}
      >
        Physical Traits
      </Heading>
      {allFilters.map(
        (f, i) =>
          traits[f.formName as keyof iTreeTraitsData] && (
            <TreeTraits
              key={i}
              trait={traits[f.formName as keyof iTreeTraitsData]}
              label={f.label}
              icon={traitIconMap[f.formName as keyof iTreeTraitsData]}
              // helperText={f.helperText}
            />
          )
      )}
    </Flex>
  );
};

export default TreeTraitsSection;
