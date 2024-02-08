import { useState, useEffect } from 'react'

import { Flex, Text, Box, Heading} from '@chakra-ui/react'

const LandingMain = () => {
    const [rotatingText, setRotatingText] = useState(0);

    const textForRotating = [
      "Find trees anywhere",
      "Remember the trees you found",
      "Save your favorite trees",
      "Scroll down to learn more!",
    ];

    useEffect(() => {
      //Implementing the setInterval method
        const interval = setInterval(() => {
            // NEED TO ADD CSS FADE IN_OUT CLASSES
            if (rotatingText + 1 >= textForRotating.length) setRotatingText(0)
            else setRotatingText(rotatingText + 1)
      }, 6000);

      //Clearing the interval
      return () => clearInterval(interval);
    }, [rotatingText]); 


  return (
    <Flex
      position={"relative"}
      justify={"center"}
      align={"center"}
      h={"90vh"}
      w={"100%"}
      bg={"red.500"}
      color={"white"}
    >
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        bg={"transparent"}
        zIndex={1}
        marginBottom={"2%"}
      >
        <Heading
          variant="h1"
          fontSize={{ base: '2.75rem', md: "4rem"}}
          textShadow={"0px 0px 2px black"}
          textAlign={'center'}
          px={'2rem'}
          fontFamily={'display'}
        >
          For the arborist in all of us
        </Heading>
        <Text
          className="rotating-text"
          margin={"0.75rem"}
          fontSize={"1.5rem"}
          textShadow={"0px 0px 2px black"}
        >
          {textForRotating[rotatingText]}
        </Text>
      </Flex>
      <Box position={"absolute"} w={"100%"} h={"100%"} bg={"white"}>
        <video
          className="video"
          src="/find-me-trees-vid.mp4"
          poster='/landing-vid-poster.png'
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </Box>
    </Flex>
  );
}

export default LandingMain
