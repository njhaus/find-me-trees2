import { useContext, useEffect, useRef, useState } from "react";

import maplibregl, { Map } from "maplibre-gl";

import { Box, Flex } from "@chakra-ui/react";

import SelectInput from "../../../components/inputs/BrowseSelectInput";
import { GeocodeData } from "../browse_data/filterFormData";
import { states, statesMap } from "../browse_data/statesData";
import { apiGet } from "../../../services/api_client";
import { FormDataContext, iFormDataContext } from "../Browse";
import "../styles/browseMap.css";
import { ApiErrorType, isApiErrorType } from "../../../data/types";

const MapFilter = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [zoom] = useState(3);

  const [state, setState] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string) => {
    setState(val);
    setFormData({
      ...formData,
      [key]: statesMap[val as keyof typeof statesMap],
    });
  };

  // Display error
  if (errorMsg) console.log(errorMsg);

  const handleCoordinates = async (coords: [number, number]) => {
    const abortController = new AbortController();

    try {
      const getRadarKey: Awaited<{key: string} | ApiErrorType> = await apiGet("data/radarkey", abortController);
      if (getRadarKey && (getRadarKey as {key: string}).key) { console.log('Success getting key')}
      else {
        if (isApiErrorType(getRadarKey)) {
        throw new Error((getRadarKey as ApiErrorType).error);
        } else {
          throw new Error("Unknown Error: Unable to fetch map key.")
        }
    }
      const radarKey = (getRadarKey as { key: string }).key;

      const response = await fetch(
        `https://api.radar.io/v1/geocode/reverse?coordinates=${coords[1]},${coords[0]}`,
        {
          headers: {
            Authorization: `${radarKey}`,
          },
        }
      );
      if (!response.ok) throw new Error("Unable to find location");
      else {
        const responseJson: GeocodeData = await response.json();
        if (responseJson.addresses[0].state) {
          handleChange("location", responseJson.addresses[0].state);
        } else {
          setErrorMsg(
            "Only locations in the United States are supported at this time."
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const setUpMap = async () => {
      try {
        const abortController = new AbortController();
        const getKey: Awaited<{ key: string } | ApiErrorType> = await apiGet(
          "data/maptilerkey",
          abortController
        );
        if (isApiErrorType(getKey)) {
          throw new Error((getKey as ApiErrorType).error);
        }
        const API_KEY = getKey.key;

        if (mapContainer.current) {
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [-95, 39],
            zoom: zoom,
          });
          // The `click` event is an example of a `MapMouseEvent`.
          // Set up an event listener on the map.
          map.current.on("click", function (e) {
            // The event object (e) contains information like the
            // coordinates of the point on the map that was clicked.
            console.log("A click event has occurred at " + e.lngLat);
            handleCoordinates([e.lngLat.lng, e.lngLat.lat]);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    setUpMap();
  }, []);

  return (
    <Flex width={"100%"} flexWrap={"wrap"}>
      <Box width={"15rem"}>
        <SelectInput
          formVal={state}
          label={"Choose a state:"}
          values={states}
          formName={"location"}
          onChange={handleChange}
        />
      </Box>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        flexGrow={1}
        min-width={"30rem"}
      >
        Or click your location on the map:
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      </Flex>
    </Flex>
  );
};

export default MapFilter;
