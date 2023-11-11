import { Flex, Heading, Image } from "@chakra-ui/react";

import TreeIntro from "./TreeIntro";
import TreeUserOptions from "../user/TreeUserOptions";
import TreeTraits from "./TreeTraits";
import TreeLocation from "./TreeLocation";

// TEMPDATA -- REPLACE
import { tempData } from "../browse/data/treeData";
import Carousel from "../../components/ui-components/Carousel";

const Tree = () => {
    
    // REPLACE THIS WITH DATA FORUND FROM THE SERVER/DATABASE USING THE ID IN THE PARAMS (Review react router vid for how to capture this...)
    const data = tempData;
    
    return (
        <Flex as={'section'} direction={"column"}>
            <Heading>Tree Heading</Heading>
            <Flex direction={"row"}>
                <Carousel
                    imgs={data.imgSrc}
                />
                <TreeIntro
                    text={data.intro}
                />
            </Flex>
            <TreeUserOptions />
            <Flex>
                <TreeTraits
                    traits={data.traits}
                />
                <TreeLocation
                    location={data.location}
                />
            </Flex>
    </Flex>
  )
}

export default Tree
