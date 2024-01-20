import { HStack, Box } from "@chakra-ui/react";

import MainLogo from "../logo/MainLogo";

const LogoContainer = () => {
  return (
    <HStack h={"100%"} gap={0} >
      <Box
        className="header-logo"
        backgroundColor={"white"}
        minWidth={{base: 'fit-content', lg: '22rem'}}
      >
        <MainLogo />
      </Box>
      <Box
        className="forest-mask"
        backgroundColor={"white"}
        h={"100%"}
        aspectRatio={"2.8/1"}
        zIndex={"5"}
        ms={'-2px'}
      ></Box>
    </HStack>
  );
}

export default LogoContainer
