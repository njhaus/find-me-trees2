import { useState, useEffect } from 'react'

import { Flex, Text } from '@chakra-ui/react'

const LandingMain = () => {
    const [rotatingText, setRotatingText] = useState(0);

    const textForRotating = [
      <Text>Find trees anywhere</Text>,
      <Text>Remember the trees you found</Text>,
      <Text>Save your favorite trees</Text>,
      <Text>Get to know the forest</Text>,
      <Text>Scroll down to begin!</Text>,
    ];

    useEffect(() => {
      //Implementing the setInterval method
        const interval = setInterval(() => {
            // NEED TO ADD CSS FADE IN_OUT CLASSES
            if (rotatingText + 1 >= textForRotating.length) setRotatingText(0)
            else setRotatingText(rotatingText + 1)
      }, 4000);

      //Clearing the interval
      return () => clearInterval(interval);
    }, [rotatingText]); 


  return (
    <Flex
      justify={'center'}
      align={'center'}
      height={'90vh'}
      width={'100%'}
      bg={'red.500'}
    >
        <Flex direction={'column' } justify={'center'} align={'center'} bg={'red.400'}>
            <Text>For those who love getting lost</Text>
            <Text>in the trees</Text>
            {textForRotating[rotatingText]}
        </Flex>
    </Flex>
  );
}

export default LandingMain
