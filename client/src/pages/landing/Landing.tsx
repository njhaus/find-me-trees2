import { useEffect } from "react";

import { Flex } from "@chakra-ui/react";

import LandingMain from "./LandingMain";
import LearnMore from "./LearnMore";
import LandingArticlesAll from "./landing_articles/LandingArticlesAll";

import './styles/landing.css'

const Landing = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
