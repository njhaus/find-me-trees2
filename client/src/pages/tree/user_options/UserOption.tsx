import { useState, useEffect, useRef } from 'react';

import {
  Flex,
  Button,
  Box,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons';
import { iUserData } from '../../../data/user_data/userData';
import useUpdateUser from '../../../hooks/useUpdateUser';
import { DataFormat, userOptionsKey } from '../../../data/user_options_data';
import useSlide from '../../../hooks/ui_hooks/useSlide';
import OptionPopup from './OptionPopup';


interface iUserOption {
  text: string;
  successText: string;
  color: string;
  icon: JSX.Element;
  id: string;
  userDataKey: userOptionsKey;
  dataFormat: DataFormat;
  hoverMsg?: string
}

const UserOption = ({ text, successText, icon, id, userDataKey, dataFormat, hoverMsg }: iUserOption) => {
  const { userData, handleUpdateUser } = useUpdateUser();
  // Object to hold data that will be put into userData if updated
  const optionData = { ...dataFormat, _id: id };

  // button slides to success message after clicked (Useslide hook does this)
  const [btnSlide, setBtnSlide] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  useSlide(btnSlide, sliderRef);

  // Show 'log in! message when button clicked if not logged in.
  const [noUserMsg, setNoUserMsg] = useState(false);

  // Hacky way to make found it button behave differntly (text changes instead of button slides), but I didn't want to refactor the whole thing right now.
  const [foundIt, setFoundIt] = useState(text);

  const userExists =
    userData &&
    userData.username &&
    userData.email &&
    userData.collections &&
    userData.favorites &&
    userData.found &&
    userData.saved &&
    userData.accessToken;

  const handleUpdate = (key: keyof iUserData, newData: DataFormat) => {
    if (userExists) {
      if (btnSlide !== true) {
        if (text !== 'Found it') {
          setBtnSlide(true);
        } 
        console.log([...userData[key]]);
        const updatedKey = [...userData[key], newData];
        console.log(updatedKey);
        handleUpdateUser(key, updatedKey);
      }
    } else {
      setNoUserMsg(!noUserMsg);
    }
  };

  // Need to update userData AFTER it has been loaded and set buttons accordingly
  // ._id._id is the tree id stored in the user, then the actual id of the tree in the populated tree data. I want to change this, but when I tried it broke everything, so I will need to come back to it.
  useEffect(() => {
    const userKeyData = userData[userDataKey];
    if (Array.isArray(userKeyData)) {
      if (
        text === "Found it"
        &&
        userKeyData.some((item) => item._id._id === id)
      ) {
        setFoundIt("Found it again");
      } else {
        setBtnSlide(userKeyData.some((item) => item._id._id === id));
      }
    } else {
      // console.log(text);
      setBtnSlide(false);
    }
  }, [userData, text]);

  return (
    <>
      <Flex width={"100%"} overflowX={"hidden"} ref={sliderRef}>
        <Flex minWidth={"100%"}>
          {hoverMsg ? (
            <Box width={"100%"}>
              <OptionPopup
                text={foundIt}
                handleUpdate={handleUpdate}
                hoverMsg={hoverMsg}
                userDataKey={userDataKey}
                userData={userData}
                dataFormat={dataFormat}
                id={id}
              />
            </Box>
          ) : (
            <Button
              width={"100%"}
              onClick={() => handleUpdate(userDataKey, optionData)}
            >
                {text}
            </Button>
          )}
        </Flex>
        <Flex minWidth={"100%"}>
          <Flex width={"100%"}>
            <CheckIcon />
            <Box>
              <Text>{successText}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {noUserMsg && (
        <Flex position={"absolute"}>
          <Text>
            Log in to add this tree to your{" "}
            {userDataKey.replace(/\b(\w+?)s\b/g, "$1")} trees!
          </Text>
          <CloseButton onClick={() => setNoUserMsg(false)}></CloseButton>
        </Flex>
      )}
    </>
  );
}

export default UserOption
