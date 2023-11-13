import { Flex, Heading, Image, Box } from "@chakra-ui/react";

import TreeIntro from "./TreeIntro";
import TreeUserOptions from "./TreeUserOptions";
import TreeTraits from "./TreeTraits";
import TreeLocation from "./TreeLocation";
import { allFilters } from '../browse/data/filterFormData'

// TEMPDATA -- REPLACE
import { iTreeData, iTreeTraitsData, tempData } from "../browse/data/treeData";
import Carousel from "../../components/ui-components/Carousel";

const Tree = () => {

    console.log(tempData);
    console.log(allFilters);
    
    // REPLACE THIS WITH DATA FORUND FROM THE SERVER/DATABASE USING THE ID IN THE PARAMS (Review react router vid for how to capture this...)
    const data = tempData;
    
    return (
      <Flex as={"section"} direction={"column"}>
        <Heading textAlign={"center"}>Tree Heading</Heading>
        <Flex direction={"row"} flexWrap={"wrap"} gap={"1rem"}>
          <Box
            as={"article"}
            width={{ base: "100%", md: "40%" }}
            maxHeight={{ base: "100vh", md: "80vh" }}
          >
            <Carousel imgs={data.imgSrc} />
          </Box>
          <Box
            as={"article"}
            maxWidth={{ base: "100%", md: "calc(60% - 1rem)" }}
            flexGrow={"1"}
            maxHeight={{ base: "100vh", md: "80vh" }}
            overflowX={"scroll"}
            bg={"red.200"}
          >
            <TreeIntro text={data.intro} />
          </Box>
        </Flex>
        <Box as={"article"} width={"100%"} bg={"purple.200"}>
          <TreeUserOptions />
        </Box>
        <Flex direction={"row"} flexWrap={"wrap"} gap={"1rem"}>
          <Flex
            as={"article"}
            maxWidth={{ base: "100%", md: "calc(50% - 1rem)" }}
            flexGrow={"1"}
                    maxHeight={{ base: "100vh", md: "80vh" }}
                    direction={'column'}
                >
                    <Heading>{data.title} Traits</Heading>
                    {allFilters.map((f, i) => (
                data.traits[f.formName as keyof iTreeTraitsData] &&
                        <TreeTraits
                            key={i}
                            trait={data.traits[f.formName as keyof iTreeTraitsData]}
                            label={f.label}
                            helperText={f.helperText}
                        />       
            ))}
          </Flex>
          <Box
            as={"article"}
            width={{ base: "100%", md: "50%" }}
            maxHeight={{ base: "100vh", md: "80vh" }}
            overflowX={"scroll"}
            bg={"yellow.200"}
          >
            <TreeLocation location={data.location} title={data.title} />
          </Box>
        </Flex>
      </Flex>
    );
}

export default Tree
