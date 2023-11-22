import {
  Flex,
  Button,
  HStack,
  chakra,
  useDisclosure as useLoginDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import links from "../../data/nav_data";
import MainLogo from "../logo/MainLogo";

import { iNav } from "./Nav";

const DesktopNav = ({ auth, onLogout }: iNav) => {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useLoginDisclosure();

  return (
    <chakra.header id="header" display={{ base: "none", md: "flex" }}>
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        {/* // Logo */}
        <MainLogo />
        {/* // Nav Items */}
        <HStack as="nav" spacing="1">
          {links.map((item, i) => (
            <Link key={i} to={item.to}>
              <Button variant="nav">{item.text}</Button>
            </Link>
          ))}
          <Button onClick={onOpenLogin}>Login</Button>
        </HStack>
      </Flex>
      {!auth?.username ? (
        <Button
          onClick={() => {
            onOpenLogin();
          }}
        >
          Login
        </Button>
      ) : (
        <Button
          onClick={() => {
            onLogout("login/logout", {});
          }}
        >
          Logout
        </Button>
      )}
    </chakra.header>
  );
};

export default DesktopNav;
