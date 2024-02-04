import { Box, Heading, VStack } from "@chakra-ui/react";

import maplibregl, { Map, MapGeoJSONFeature, MapMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import "../../styles/map.css";

import { iUserFound } from "../../user_data/userData";
import { apiGet } from "../../../../services/api_client";
import { ApiErrorType, isApiErrorType } from "../../../../data/types";

interface iFoundMap {
  data: iUserFound[];
  location: [number, number];
}

const FoundMap = ({ data, location }: iFoundMap) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [zoom] = useState(3);
  const currentLocation = location;

  const mapData = {
    type: "FeatureCollection",
    features: data.map((found) => ({
      type: "feature",
      properties: {
        id: found._id._id,
        title: found._id.title,
        imgSrc: found._id.imgSrc[0],
      },
      geometry: {
        type: "Point",
        coordinates: found.location.coordinates,
      },
    })),
  };

  const popoverCursor = () => {
    map.current
      ? (map.current.getCanvas().style.cursor = "pointer")
      : console.warn("Error setting mouse actions on popovers");
  };

  const showPopover = (
    e: MapMouseEvent & {
      features?: MapGeoJSONFeature[] | undefined;
    }
  ) => {
    // @ts-ignore
    const coordinates = e.features[0].geometry.coordinates.slice();
    // @ts-ignore
    const title = e.features[0].properties.title;
    // @ts-ignore
    const imgSrc = e.features[0].properties.imgSrc;
    // @ts-ignore
    const id = e.features[0].properties.id;

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Create elements for popup
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("map-popup");
    const popupTitle = document.createElement("h4");
    popupTitle.textContent = title;
    const popupImg = document.createElement("img");
    popupImg.setAttribute("src", imgSrc);
    const popupLink = document.createElement("a");
    popupLink.textContent = `View ${title}`;
    popupLink.setAttribute("href", `/tree/${id}`);

    // Place popup elements in container
    popupContainer.append(popupTitle);
    popupContainer.append(popupImg);
    popupContainer.append(popupLink);

    if (map.current) {
      new maplibregl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(popupContainer)
        .addTo(map.current);
    }
  };

  const clusterZoom = (
    e: MapMouseEvent & {
      features?: MapGeoJSONFeature[] | undefined;
    }
  ) => {
    if (map.current) {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      if (map.current) {
        const source = map.current.getSource("trees");
        if (source) {
          // @ts-ignore
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (!err && zoom !== undefined) {
              // @ts-ignore
              const features = source.getClusterLeaves(clusterId, Infinity);
              if (features && features.length > 0) {
                // @ts-ignore
                map.current.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom,
                });
              }
            }
          });
        }
      }
    }
  };

  const createClusters = () => {
    if (map.current) {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.current.addSource("trees", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: mapData,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "trees",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://maplibre.org/maplibre-style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#008000",
            10,
            "#ffd700",
            20,
            "#fffff0",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 25, 20, 30],
        },
      });

      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "trees",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.current.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "trees",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "rgb(60,91,60)",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      // inspect a cluster on click
      map.current.on("click", "clusters", clusterZoom);

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on("click", "unclustered-point", showPopover);

      map.current.on("mouseenter", "clusters", popoverCursor);
      map.current.on("mouseleave", "clusters", popoverCursor);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const setUpMap = async () => {
      try {
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

        if (mapContainer.current && location) {
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [currentLocation[0], currentLocation[1]],
            zoom: zoom,
          });
          map.current.addControl(
            new maplibregl.NavigationControl(),
            "top-right"
          );
          map.current.on("load", createClusters);
        }
      } catch (err) {
        console.error(err);
      }
    };
    setUpMap();
    // CLEANUP FUNCTION NEEDED -- the one below gives errors
    return () => {
      if (map.current) {
        map.current.off("load", createClusters);
        map.current.off("click", "clusters", clusterZoom);
        map.current.off("click", "unclustered-point", showPopover);
        map.current.off("mouseenter", "clusters", popoverCursor);
        map.current.off("mouseleave", "clusters", popoverCursor);
      }
    };
  }, [zoom, location[1], location[0], data]);

  return (
    <VStack
      className={"blur-border-light"}
      borderRadius={"10px"}
      w={"100%"}
      bg={"white"}
      mt={"1rem"}
      p={"2rem"}
      flexGrow={"1"}
      // minWidth={"32rem"}
      maxHeight={"100%"}
    >
      <Heading
        as={"h4"}
        textAlign={"center"}
        color={"main.200"}
        fontWeight={"500"}
        fontSize={"1.5rem"}
      >
        Use the map to explore trees you've found
      </Heading>
      <Box className="map-wrap" m={0}>
        <Box ref={mapContainer} className="map" />
      </Box>
    </VStack>
  );
};

export default FoundMap;
