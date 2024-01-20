import { Flex, Text , Box, Divider} from "@chakra-ui/react";

import { iSciInfo, iTreeData } from "../../data/tree_data";
import { BsChatRightFill } from "react-icons/bs";

interface iTreeSciInfo {
  sciInfo: iSciInfo;
}

const keyIconMap: Record<keyof iSciInfo, JSX.Element> = {
  scientificName: <BsChatRightFill color={"rgb(255,213,234)"} />,
  commonNames: <BsChatRightFill color={"rgb(255,213,234)"} />,
  family: <BsChatRightFill color={"rgb(255,213,234)"} />,
  hardinessZone: <BsChatRightFill color={"rgb(255,213,234)"} />,
  origin: <BsChatRightFill color={"rgb(255,213,234)"} />,
  uses: <BsChatRightFill color={"rgb(255,213,234)"} />,
  availability: <BsChatRightFill color={"rgb(255,213,234)"} />,
};

const TreeSciInfo = ({ sciInfo}: iTreeSciInfo) => {
  return (
    <Flex
      as={"article"}
      minWidth={"10rem"}
      direction={"column"}
      justifyContent={"space-around"}
      width={{ base: "100%", md: "30%", lg: "20%" }}
      my={"1rem"}
      px={"2rem"}
    >
      {Object.keys(sciInfo).map((key) => (
        <Box key={key}>
          <Divider color={"white"} mb={"1rem"} />
          <Flex
            direction={"row"}
            alignItems={"start"}
            gap={"0.5rem"}
            px={"0.5rem"}
          >
            {keyIconMap[key as keyof iSciInfo]}
            <Text
              textTransform={"uppercase"}
              fontWeight={"600"}
              fontSize={"0.9rem"}
              color={"accent.900"}
            >
              {key.split(/(N)/).slice(0, 1)}{" "}
              {key.split(/(N)/).slice(1).join("")}:
            </Text>
          </Flex>
          <Text fontSize={"0.9rem"} px={"0.5rem"} mb={"0.5rem"}>
            {sciInfo[key as keyof iSciInfo]}
          </Text>
        </Box>
      ))}
      <Divider color={"white"} />
    </Flex>
  );
}

export default TreeSciInfo
