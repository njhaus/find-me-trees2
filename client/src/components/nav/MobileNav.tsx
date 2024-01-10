import {
  Flex,
  chakra,
} from "@chakra-ui/react";

import MobileDrawer from "./MobileDrawer";
import MainLogo from "../logo/MainLogo";

import { iNav } from "./Nav";

const MobileNav = ({ auth, onLogout }: iNav) => {
  return (
    <>
      <chakra.header id="header" display={{ base: "flex", md: "none" }}>
        <Flex w="100%" align="center" justify="space-between">
          {/* // Logo */}
          <MainLogo />
          {/* // Dropdown Menu */}
          <MobileDrawer auth={auth} onLogout={onLogout} />
        </Flex>
      </chakra.header>
    </>
  );
};

export default MobileNav;
