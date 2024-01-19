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
  Flex,
  HStack,
  Box,
  useDisclosure
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import FoundOptionMap from "./foundOptionMap";

interface iOptionPopup {
  btnClicked: boolean,
  handleUpdate: (key: keyof iUserData, newData: DataFormat) => void;
  hoverMsg: string;
  userDataKey: userOptionsKey;
  userData: iUserData;
  dataFormat: DataFormat;
  id: string;
  icon: JSX.Element;
}

const OptionPopup = ({ btnClicked, handleUpdate, hoverMsg, userDataKey, icon, dataFormat, id }: iOptionPopup) => {
    
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
        <Flex
          direction={{ base: "column", md: "row", lg: "column" }}
          justifyContent={"start"}
          alignItems={"center"}
          onClick={onOpen}
        >
          {!btnClicked ? (
            <>
              <Button
                mx={"0.5rem"}
                variant={"icon"}
                fontSize={"1.5rem"}
                bg="white"
                color="accent.500"
              >
                {icon}
              </Button>
            </>
          ) : (
            <Box className="found-btn">
              {btnClicked && (
                <Box className="found-hover">Click to record another find.</Box>
              )}
              <Button
                mx={"0.5rem"}
                variant={"icon"}
                fontSize={"1.5rem"}
                bg="accent.500"
                color="white"
              >
                {icon}
              </Button>
            </Box>
          )}
          <HStack gap={"0.5rem"} flexGrow={1}>
            {btnClicked && <CheckIcon color="accent.500" />}
            <Text
              color="accent.500"
              textAlign={"center"}
              fontSize={"0.9rem"}
              flexGrow={1}
            >
              Found it
              {btnClicked && "!"}
            </Text>
          </HStack>
        </Flex>
      </PopoverTrigger>
      <PopoverContent p={"0.5rem"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader mt={"0.5rem"}>{hoverMsg}</PopoverHeader>
        <Button mb={"0.5rem"} onClick={() => onUpdate()}>
          Use My Location
        </Button>
        {!showMap ? (
          <Button mb={"0.5rem"} onClick={() => setShowMap(true)}>
            Find location on Map
          </Button>
        ) : (
          <>
            <Button mb={"0.5rem"} onClick={() => onUpdate()}>
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
