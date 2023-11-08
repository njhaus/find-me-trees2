import { Box, Flex, Image } from "@chakra-ui/react";

import LandingMain from "./LandingMain";
import LearnMore from "./LearnMore";
import LandingArticlesAll from "./landing_articles/LandingArticlesContainer";

const Landing = () => {
  return (
    <Flex as={"section"} direction={"column"}>
      <LandingMain />
      <LandingArticlesAll />
      <LearnMore></LearnMore>
    </Flex>
  );
};

export default Landing;

// Design template: https://theoceancleanup.com/
