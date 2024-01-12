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
import MainLogo from "../logo/MainLogo";
import Login from "../login_auth/Login";

import { iNav } from "./Nav";

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
    >
      <Flex w="100%" align="center" justify="space-between" h={"100%"}>
        {/* // Logo */}
        <HStack h={"100%"} gap={0}>
          <Box
            className="header-logo"
            backgroundColor={"secondary.900"}
            pe={"1rem"}
          >
            <MainLogo />
          </Box>
          <Box
            className="forest-mask"
            backgroundColor={"secondary.900"}
            h={"100%"}
            aspectRatio={"2.7/1"}
            zIndex={"5"}
          ></Box>
        </HStack>
        {/* // Nav Items */}
        <HStack as="nav" spacing="1" px={"1.5rem"}>
          {links.map((item, i) => (
            <Link key={i} to={item.to}>
              <Button variant="nav">{item.text}</Button>
            </Link>
          ))}
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
