import { useEffect } from "react";

import {
  Box,
  Flex,
  Button,
  HStack,
  chakra,
  useDisclosure as useLoginDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import links from "../../data/nav_data";
import Login from "../login_auth/Login";

import { iNav } from "./Nav";
import LogoContainer from "./LogoContainer";

const DesktopNav = ({ auth, onLogout, redirect }: iNav) => {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useLoginDisclosure();

  // Open login if redirected from another page with 'you must log in to see this page' message
  useEffect(() => {
    if (redirect) {
      onOpenLogin()
    }
  }, [redirect])

  return (
    <chakra.header
      id="header"
      display={{ base: "none", md: "flex" }}
      h={"4rem"}
      zIndex={"5"}
      backgroundColor={"main.900"}
    >
      <Flex
        w="100%"
        align="center"
        justify="space-between"
        h={"100%"}
        overflowX={"hidden"}
      >
        {/* // Logo */}
        <LogoContainer />
        {/* // Nav Items */}
        <HStack as="nav" spacing="1" px={"1.5rem"}>
          {links.map((item, i) => (
            <Link key={i} to={item.to}>
              <Button
                variant="nav"
                textTransform={"uppercase"}
                fontSize={"0.9rem"}
              >
                {item.text}
              </Button>
            </Link>
          ))}
          {!auth?.username ? (
            <Button
              onClick={() => {
                onOpenLogin();
              }}
              variant={"login"}
            >
              Login
            </Button>
          ) : (
            <Button
              variant={"solidDark"}
              onClick={() => {
                onLogout();
              }}
            >
              Logout
            </Button>
          )}
        </HStack>
      </Flex>
      {!auth?.username && (
        <Login isOpenLogin={isOpenLogin} onCloseLogin={onCloseLogin} />
      )}
    </chakra.header>
  );
};

export default DesktopNav;
