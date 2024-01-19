import { useRef, useEffect } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure as useDrawerDisclosure,
  useDisclosure as useLoginDisclosure,
  IconButton,
  Box,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import links from "../../data/nav_data";
import Login from "../login_auth/Login";
import MainLogo from "../logo/MainLogo";
import Boundary from "../ui-components/Boundary";

import { iNav } from "./Nav";

const MobileDrawer = ({auth, onLogout}: iNav) => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDrawerDisclosure();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useLoginDisclosure();

  const btnRef = useRef(null);


  return (
    <Box className="mobile-drawer" me={"1rem"} zIndex={10}>
      <Button
        variant={"outlineDark"}
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpenDrawer}
      />
      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        onClose={onCloseDrawer}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box
            className="drawer-decoration"
            width={"100%"}
            aspectRatio={"2/1"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            backgroundColor={"secondary.800"}
            marginTop={"12rem"}
          ></Box>
          <Box
            position={"absolute"}
            top={"0"}
            left={"0"}
            backgroundColor={"secondary.800"}
            width={"100%"}
            height={"100%"}
            marginTop={"21.9rem"}
          ></Box>
          <DrawerCloseButton />
          <DrawerHeader>
            <MainLogo />
            <Boundary color={"main.100"} width={"90%"} />
          </DrawerHeader>

          <DrawerBody>
            <VStack>
              {links.map((item, i) => (
                <Link key={i} to={item.to}>
                  <Button
                    variant="nav"
                    textTransform={"uppercase"}
                    fontSize={"0.9rem"}
                    onClick={onCloseDrawer}
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            {!auth?.username ? (
              <Button
                onClick={() => {
                  onOpenLogin();
                  onCloseDrawer();
                }}
                variant={"login"}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onLogout();
                  onCloseDrawer();
                  }}
                  variant={'login'}
              >
                Logout
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {!auth?.username && (
        <Login isOpenLogin={isOpenLogin} onCloseLogin={onCloseLogin} />
      )}
    </Box>
  );
};
export default MobileDrawer;
