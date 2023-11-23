import { useRef } from "react";

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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import links from "../../data/nav_data";
import Login from "../login_auth/Login";


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
    <>
      <Button
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
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
          <DrawerCloseButton />
          <DrawerHeader>Find Me Trees</DrawerHeader>

          <DrawerBody>
            {links.map((item, i) => (
              <Link key={i} to={item.to}>
                <Button variant="nav" onClick={onCloseDrawer}>
                  {item.text}
                </Button>
              </Link>
            ))}
          </DrawerBody>

          <DrawerFooter>
            {
              !auth?.username ?
                <Button
                  onClick={() => {
                    onOpenLogin();
                    onCloseDrawer();
                  }}
                >
                  Login
                </Button> :
                <Button
                  
                  onClick={() => {
                    onLogout('login/logout', {});
                    onCloseDrawer()
                  }}
                >
                  Logout
                </Button>
            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default MobileDrawer;
