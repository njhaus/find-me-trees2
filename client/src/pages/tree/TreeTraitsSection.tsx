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
      className='blur-border'
      maxWidth={{ base: "100%", md: "40%" }}
      flexGrow={"1"}
      maxHeight={{ base: "100vh", md: "80vh" }}
      direction={"column"}
      bg={"white"}
      mx={"3rem"}
      my={"2rem"}
      p={'1rem'}
      borderRadius={"10px"}
    >
      <Heading as={"h3"} fontSize={"2rem"} color={'main.300'} mb={'1rem'} mx={'auto'}>
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
