import { useEffect, useRef } from "react";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { BsSquareFill } from "react-icons/bs";
import { abbreviationMap } from "../browse/browse_data/statesData";
import { apiGet } from "../../services/api_client";
import { geojson } from "./data/tree-location";
import { UsState } from "./data/tree_data";
import { ApiErrorType, isApiErrorType } from "../../data/types";

interface iTreeLocation {
  location: UsState[];
}

const TreeLocation = ({ location }: iTreeLocation) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  function addStats(geojson: any) {
    geojson.features.forEach((feature: any) => {
      const statsForFeature = location.find(
        (l) => abbreviationMap[l] === feature.properties.name
      );
      if (statsForFeature) {
        // add stats to the feature's properties
        feature.properties = { ...feature.properties, color: "#0000ff" };
      } else {
        feature.properties = { ...feature.properties, color: "transparent" };
      }
    });

    return geojson;
  }

  useEffect(() => {
    // Set color based on invasive or native
    // const mapColor =

    // Refactor -- move map set up function into another file.
    const setUpMap = async () => {
      const abortController = new AbortController();

      try {
        // get key
        const getKey: Awaited<{key: string} | ApiErrorType> = await apiGet("data/maptilerkey", abortController);
        if (getKey && (getKey as { key: string }).key) {
          console.log("Success getting key");
        } else {
          if (isApiErrorType(getKey)) {
            throw new Error((getKey as ApiErrorType).error);
          } else {
            throw new Error("Unknown Error: Unable to fetch map key.");
          }
        }
        const API_KEY = (getKey as { key: string }).key;

        // Make map
        if (mapContainer.current) {
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/hybrid/style.json?key=${API_KEY}`,
            center: [-100.486052, 37.830348],
            zoom: 2,
            interactive: false,
          });

          map.current?.on("load", () => {
            if (map.current) {
              map.current.addSource("states", {
                type: "geojson",
                data: addStats(geojson),
              });
            }

            // The feature-state dependent fill-opacity expression will render the hover effect
            // when a feature's hover state is set to true.
            map.current?.addLayer({
              id: "state-fills",
              type: "fill",
              source: "states",
              layout: {},
              paint: {
                "fill-color": ["get", "color"],
              },
            });

            map.current?.addLayer({
              id: "state-borders",
              type: "line",
              source: "states",
              layout: {},
              paint: {
                "line-color": "#aaaaaa",
                "line-width": 1,
              },
            });
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    setUpMap();
  }, []);

  return (
    <Flex
      className="blur-border"
      direction={"column"}
      alignItems={"center"}
      as={"article"}
      width={{ base: "100%", md: "calc(60% - 4rem)" }}
      bg={"white"}
      mx={"2rem"}
      my={"2rem"}
      p={"1rem"}
      borderRadius={"10px"}
    >
      <Heading as={"h2"} color={"main.300"}>
        Distribution
      </Heading>
      <Box className={"map-wrap"} my={"0.5rem"}>
        <Box id="map" ref={mapContainer} className="map"></Box>
      </Box>
      <Flex gap={"2rem"}>
        <Flex gap={"0.5rem"}>
          <BsSquareFill color={"blue"} />
          <Text color={"main.300"} variant={"smallCaps"}>
            Native
          </Text>
        </Flex>
        <Flex gap={"0.5rem"}>
          <BsSquareFill color={"red"} />
          <Text color={"main.300"} variant={"smallCaps"}>
            Invasive
          </Text>
        </Flex>
      </Flex>
      <Flex gap={"0.5rem"}>
        <Text variant={"smallCaps"} color={"main.300"}>
          Found in:
        </Text>
        {location.map((loc, i) => (
          <Text
            key={i}
            display={"inline"}
            color={"main.300"}
            fontSize={"0.9rem"}
          >
            {loc} {i < location.length - 1 && ","}{" "}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default TreeLocation;
