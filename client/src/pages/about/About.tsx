import { VStack, Heading, Flex } from "@chakra-ui/react"
import AboutSection from "./AboutSection"
import RedwoodBg from "../../components/backgrounds/RedwoodBg";
import CurveBorder from "../../components/borders/CurveBorder";

const About = () => {
  return (
    <VStack as={"main"} minHeight={"calc(100vh - 10rem)"} bg={"main.900"} pb={'3rem'}>
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
        >
          For the Arborist in all of Us
        </Heading>
      </Flex>
      <CurveBorder color={"main.900"}  direction="reverse"/>
      <VStack px={"4rem"} mt={'-1rem'}>
        <AboutSection direction="row" />
        <AboutSection direction="row-reverse" />
        <AboutSection direction="row" />
        <AboutSection direction="row-reverse" />
      </VStack>
    </VStack>
  );
}

export default About
