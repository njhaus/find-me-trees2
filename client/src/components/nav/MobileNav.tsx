import {
  useDisclosure,
  Flex,
  Button,
  HStack,
  Image,
  chakra,
} from "@chakra-ui/react";

import MobileDrawer from "./MobileDrawer";
import MainLogo from "../logo/MainLogo";

const MobileNav = () => {
  return (
    <>
      <chakra.header id="header" display={{ base: "flex", md: "none" }}>
        <Flex w="100%" px="6" py="5" align="center" justify="space-between">
          {/* // Logo */}
          <MainLogo />
          {/* // Dropdown Menu */}
          <MobileDrawer />
        </Flex>
      </chakra.header>
    </>
  );
};

export default MobileNav;
