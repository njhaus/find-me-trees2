import { useContext, useRef, useState, useEffect } from "react";

import maplibregl, { Map } from "maplibre-gl";

import { Flex, Image, Box } from "@chakra-ui/react";

import { useImg } from "../../../hooks/useImg";
import SelectInput from "../../../components/inputs/BrowseSelectInput";
import { states } from "../../../data/browse_data/statesData";
import { FormDataContext, iFormDataContext } from "../Browse";
import { GeocodeData } from "../../../data/browse_data/filterFormData";
import { statesMap } from "../../../data/browse_data/statesData";
import '../styles/browseMap.css'

const MapFilter = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [zoom] = useState(3);
  const [API_KEY] = useState("2XZKg54dnt7JS7AZhe7J");

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

  console.log(formData);

  const handleCoordinates = async (coords: [number, number]) => {
    try {
      const response = await fetch(
        `https://api.radar.io/v1/geocode/reverse?coordinates=${coords[1]},${coords[0]}`,
        {
          headers: {
            Authorization:
              "prj_test_pk_9755543cb702cecadcdd869bc9045909d187e28e",
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
