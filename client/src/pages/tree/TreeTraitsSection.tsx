import { Flex, Heading } from "@chakra-ui/react";

import TreeTraits from "./TreeTraits";
import { iTreeTraitsData } from "../../data/tree_data";
import { allFilters } from "../../data/browse_data/filterFormData";
import { BsDeviceHdd } from "react-icons/bs";

interface iTreeTraitsSection {
  title: string;
  traits: iTreeTraitsData
}

const traitIconMap: Record<keyof iTreeTraitsData, JSX.Element> = {
  leafType: <BsDeviceHdd color={"green"}/>,
  leafShape: <BsDeviceHdd color={"green"}/>,
  leafSize: <BsDeviceHdd color={"green"}/>,
  bark: <BsDeviceHdd color={"green"}/>,
  branches: <BsDeviceHdd color={"green"}/>,
  fruit: <BsDeviceHdd color={"green"}/>,
  flower: <BsDeviceHdd color={"green"}/>,
  location: <BsDeviceHdd color={"green"}/>,
};

const TreeTraitsSection = ({title, traits }: iTreeTraitsSection) => {
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
}

export default TreeTraitsSection
