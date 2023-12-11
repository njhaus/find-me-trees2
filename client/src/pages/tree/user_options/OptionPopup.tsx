import { useEffect, useState } from "react";

import { iUserData } from "../../../data/user_data/userData"
import { DataFormat, userOptionsKey } from "../../../data/user_options_data";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button
} from "@chakra-ui/react";

interface iOptionPopup {
  text: string;
  handleUpdate: (key: keyof iUserData, newData: DataFormat) => void;
  hoverMsg: string;
  userDataKey: userOptionsKey;
  userData: iUserData;
  dataFormat: DataFormat;
  id: string;
}

const OptionPopup = ({ text, handleUpdate, hoverMsg, userDataKey, userData, dataFormat, id }: iOptionPopup) => {
    
    // const [location, setLocation] = useState([-80, 41])
    const [newData, setNewData] = useState({ ...dataFormat, _id: id })

    useEffect(() => {
        // Id wasn't picked up by state, so had to set it like this.
        setNewData({ ...dataFormat, _id: id });
        // get location
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
  }, []);

  return (
    <Popover>
      <PopoverTrigger>
        <Button width={"100%"}>{text}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{hoverMsg}</PopoverHeader>
        <Button onClick={() => handleUpdate(userDataKey, newData)}>Use My Location</Button>
        <Button>Input a Location</Button>
      </PopoverContent>
    </Popover>
  );
}

export default OptionPopup
