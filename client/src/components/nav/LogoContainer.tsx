import { HStack, Box } from "@chakra-ui/react";

import MainLogo from "../logo/MainLogo";

const LogoContainer = () => {
  return (
    <HStack h={"100%"} gap={0}>
      <Box className="header-logo" backgroundColor={"white"}>
        <MainLogo />
      </Box>
      <Box
        className="forest-mask"
        backgroundColor={"white"}
        h={"100%"}
        aspectRatio={"2.7/1"}
        zIndex={"5"}
      ></Box>
    </HStack>
  );
}

export default LogoContainer
