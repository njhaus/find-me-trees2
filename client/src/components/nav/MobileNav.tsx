import {
  Flex,
  chakra,
} from "@chakra-ui/react";

import MobileDrawer from "./MobileDrawer";

import LogoContainer from "./LogoContainer";
import { iNav } from "./Nav";

const MobileNav = ({ auth, onLogout }: iNav) => {
  return (
    <>
      <chakra.header
        id="header"
        display={{ base: "flex", md: "none" }}
        bg={"main.900"}
      >
        <Flex
          w="100%"
          align="center"
          justify="space-between"
          overflowX={"hidden"}
        >
          {/* // Logo */}
          <LogoContainer />
          {/* // Dropdown Menu */}
          <MobileDrawer auth={auth} onLogout={onLogout} />
        </Flex>
      </chakra.header>
    </>
  );
};

export default MobileNav;
