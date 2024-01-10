import { Flex } from "@chakra-ui/react";

import LandingMain from "./LandingMain";
import LearnMore from "./LearnMore";
import LandingArticlesAll from "./landing_articles/LandingArticlesAll";

import './styles/landing.css'

const Landing = () => {
  return (
    <Flex as={"section"} direction={"column"} w={'100%'}>
      <LandingMain />
      <LandingArticlesAll />
      <LearnMore></LearnMore>
    </Flex>
  );
};

export default Landing;

// Design template: https://theoceancleanup.com/
