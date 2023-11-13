import { useState, useEffect, useRef } from 'react';

import { Flex, Button, Text } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons';


interface iUserOption {
  text: string;
  successText: string;
  color: string;
  icon: JSX.Element;
  onClick: (text: string) => void;
}

const UserOption = ({ text, successText, icon, onClick }: iUserOption) => {
    
    const [btnSlide, setBtnSlide] = useState(false);
    const sliderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (btnSlide === true && sliderRef.current) {
            sliderRef.current.scroll({
                left: sliderRef.current.offsetWidth,
                behavior: 'smooth'
            })
        }
    }, [btnSlide])

  return (
    <Flex width={"100%"} overflowX={"hidden"} ref={sliderRef}>
      <Flex minWidth={"100%"}>
        <Button
          width={"100%"}
          onClick={() => {
            if (btnSlide !== true) setBtnSlide(true);
            onClick(text);
          }}
        >
          {text}
        </Button>
      </Flex>
      <Flex minWidth={"100%"}>
        <Flex width={"100%"}>
          <CheckIcon />
          <Text>{successText}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserOption
