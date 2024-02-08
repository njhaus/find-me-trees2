import { VStack, Heading, Flex } from "@chakra-ui/react"
import AboutSection from "./AboutSection"
import RedwoodBg from "../../components/backgrounds/RedwoodBg";
import CurveBorder from "../../components/borders/CurveBorder";

import { aboutInfo } from "./data/aboutData";
import { useEffect } from "react";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <VStack as={"main"} minHeight={"calc(100vh - 10rem)"} bg={"main.950"} pb={'3rem'}>
      <Flex
        height={"15rem"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
        pb={"2rem"}
      >
        <RedwoodBg />
        <Heading
          fontFamily={"display"}
          fontSize={"3rem"}
          color="white"
          zIndex={1}
          textAlign={'center'}
          mx={'2rem'}
        >
          For the arborist in all of us
        </Heading>
      </Flex>
      <CurveBorder color={"main.950"}  direction="reverse"/>
      <VStack px={"4rem"} mt={'-1rem'}>
        {aboutInfo.map((sec, i) => (
          <AboutSection
            key={i}
            title={sec.title}
            text={sec.text}
            imgSrc={sec.imgSrc}
            direction={i % 2 === 0 ? 'row' : 'row-reverse'}
            link={sec?.link}
            linkText={sec?.linkText}
          />
        ))}
      </VStack>
    </VStack>
  );
}

export default About
