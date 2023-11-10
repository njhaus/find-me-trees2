import { Flex, Heading, Image } from "@chakra-ui/react";

import TreeIntro from "./TreeIntro";
import TreeUserOptions from "../user/TreeUserOptions";
import TreeDescription from "./TreeDescription";
import TreeLocation from "./TreeLocation";

const Tree = () => {
    
    // const testData = {}
    
    return (
        <Flex as={'section'} direction={"column"}>
            <Heading>Tree Heading</Heading>
            <Flex direction={"row"}>
                <Image />
                <TreeIntro/>
            </Flex>
            <TreeUserOptions />
            <Flex>
                <TreeDescription />
                <TreeLocation/>
            </Flex>
    </Flex>
  )
}

export default Tree
