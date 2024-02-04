import { useEffect, useState } from "react";

import { Flex, TabPanel } from "@chakra-ui/react";
import { iUserFound } from "../user_data/userData";

import FoundList from "./found_panel/FoundList";
import FoundMap from "./found_panel/FoundMap";

interface iFoundPanel {
  found: iUserFound[];
}

const FoundPanel = ({ found }: iFoundPanel) => {
  const [locationFilter, setLocationFilter] = useState<[number, number]>([
    -75, 40,
  ]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      setLocationFilter([crd.longitude, crd.latitude]);
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <TabPanel
      as={"article"}
      bg={"main.900"}
      h={{ base: "fit-content", lg: "100vh" }}
      overflow={"hidden"}
      py={"2rem"}
      px={"1rem"}
      minHeight={"calc(100vh - 20rem)"}
    >
      <Flex
        direction={{ base: "column", lg: "row-reverse" }}
        alignItems={"stretch"}
        justifyContent={"center"}
        gap={"2rem"}
        h={"100%"}
      >
        {/* // NEED TO REDO THIS COMPONENT */}
        {/* <FoundSelect onSelect={handleSelect} /> */}
        <FoundMap data={found} location={locationFilter} />
        <FoundList data={found} />
      </Flex>
    </TabPanel>
  );
};

export default FoundPanel;
