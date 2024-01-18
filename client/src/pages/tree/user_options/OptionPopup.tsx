import { useEffect, useState } from "react";

import { iUserData } from "../../../data/user_data/userData"
import { DataFormat, userOptionsKey } from "../../../data/user_options_data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  Text,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  VStack,
  useDisclosure
} from "@chakra-ui/react";

import FoundOptionMap from "./foundOptionMap";

interface iOptionPopup {
  text: string;
  handleUpdate: (key: keyof iUserData, newData: DataFormat) => void;
  hoverMsg: string;
  userDataKey: userOptionsKey;
  userData: iUserData;
  dataFormat: DataFormat;
  id: string;
  icon: JSX.Element;
}

const OptionPopup = ({ text, handleUpdate, hoverMsg, userDataKey, icon, dataFormat, id }: iOptionPopup) => {
    
    const { onOpen, onClose, isOpen } = useDisclosure();

  const [newData, setNewData] = useState({ ...dataFormat, _id: id })
  const [showMap, setShowMap] = useState(false);
  // Coordinates for setting location with map
  const [coordinates, setCoordinates] = useState([-74, 39])

  const handleCoordinates = (coords: [number, number]) => {
    setCoordinates(coords)
    setNewData({
      location: {
        type: "point",
        coordinates: [coords[0], coords[1]],
      },
      _id: id,
    });
  }

  const onUpdate = () => {
    console.log(coordinates)
    console.log(newData);
    handleUpdate(userDataKey, newData);
    setShowMap(false);
    onClose();
  }

  console.log(newData);
  
    useEffect(() => {
      // Id wasn't picked up by useState, so had to set it like this.
      // setNewData({ ...dataFormat, _id: id });
      // get location
      console.log(newData);
      const options = {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 0,
      };

      function success(pos: GeolocationPosition) {
        const crd = pos.coords;
        setNewData({
          location: {
            type: "point",
            coordinates: [crd.longitude, crd.latitude],
          },
          _id: id,
        });
      }

      function error(err: GeolocationPositionError) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }, [onOpen, onClose, isOpen, id]);

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
    >
      <PopoverTrigger>
        <VStack justifyContent={"start"} onClick={onOpen}>
          {text === "Found it" ? (
            <>
              <Button
                variant={"icon"}
                fontSize={"1.5rem"}
                bg="white"
                color="accent.500"
              >
                {icon}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={"icon"}
                fontSize={"1.5rem"}
                bg="accent.500"
                color="white"
              >
                {icon}
              </Button>
            </>
          )}
          <Text color="accent.500" textAlign={"center"}>
            {text}
          </Text>
        </VStack>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{hoverMsg}</PopoverHeader>
        <Button onClick={() => onUpdate()}>Use My Location</Button>
        {!showMap ? (
          <Button onClick={() => setShowMap(true)}>Find location on Map</Button>
        ) : (
          <>
            <Button onClick={() => onUpdate()}>
              Save Location (
              {coordinates
                .map((coord) => coord.toFixed(3))
                .reverse()
                .join(", ")}
              )
            </Button>
            <FoundOptionMap handleCoordinates={handleCoordinates} />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default OptionPopup
