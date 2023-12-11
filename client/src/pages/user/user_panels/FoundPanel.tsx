import { useState, useEffect } from "react";

import { TabPanel, Flex, Text } from "@chakra-ui/react";
import { iUserFound } from "../../../data/user_data/userData";

import FoundSelect from "./found_panel/FoundSelect";
import FoundMap from "./found_panel/FoundMap";
import FoundList from "./found_panel/FoundList";


interface iFoundPanel {
    found: iUserFound[];
}

const FoundPanel = ({ found }: iFoundPanel) => {
    
    const [locationFilter, setLocationFilter] = useState<[number, number]>([-75, 40])

    const handleSelect = (form: null, location: [number, number]) => {
      setLocationFilter(location);
    };
  
  console.log(locationFilter);
    
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      console.log([crd.longitude, crd.latitude]);
      setLocationFilter([crd.longitude, crd.latitude])
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  }, [])

  return (
    <TabPanel
      as={"article"}
      bg={"yellow.200"}
      maxHeight={"100vh"}
      overflow={"hidden"}
      padding={0}
    >
      <Text textAlign={"center"}>
        Select a location or click a location on the map to explore trees you've
        found in that area.
      </Text>
      <Flex
        direction={"row-reverse"}
        align={"center"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Flex
          direction={"column"}
          bg={"yellow.100"}
          flexGrow={"1"}
          minWidth={"32rem"}
          align={"center"}
        >
          {/* <FoundSelect onSelect={() => handleSelect(null, [1, 2])} /> */}
          <FoundMap
            data={found}
            onClick={handleSelect}
            location={locationFilter}
          />
        </Flex>
        <Flex
          bg={"yellow.300"}
          width={{ base: "100%", lg: "30rem" }}
          padding={"1rem"}
          direction={"column"}
          maxHeight={"100vh"}
          overflowY={"scroll"}
        >
          <Text>Trees I've found (Change to match search queries)</Text>
          <FoundList data={found} location={locationFilter} />
        </Flex>
      </Flex>
    </TabPanel>
  );
}

export default FoundPanel
