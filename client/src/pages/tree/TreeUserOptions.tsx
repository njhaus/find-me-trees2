

import { Box, Flex, Text } from "@chakra-ui/react"
import { BsHeart, BsSave, BsSearch } from "react-icons/bs"

import UserOption from "./user_options/UserOption";

const TreeUserOptions = () => {

  const options = [
  {
    text: "Save",
    successText: "Saved!",
    color: "blue.100",
    icon: <BsSave />,
  },
  {
    text: "Favorite",
    successText: "Added!",
    color: "green.100",
    icon: <BsHeart />,
  },
  {
    text: "Found it",
    successText: "Nice find!",
    color: "red.100",
    icon: <BsSearch />,
  },
  ];

  const handleClick = (text: string): void => {
    console.log(text);
  }
  
  return (
    <Flex direction={"row"} alignItems={ 'center'} gap={'2rem'} height={'3.5rem'} paddingX={'1rem'}>
      {options.map((op, i) => (
        <Box key={i} width={'8rem'}>
          <UserOption
            text={op.text}
            successText={op.successText}
            color={op.color}
            icon={op.icon}
            onClick={handleClick}
          />
        </Box>
      ))}
    </Flex>
  );
}

export default TreeUserOptions
