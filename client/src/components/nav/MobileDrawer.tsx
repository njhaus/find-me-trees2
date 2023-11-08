import { useRef } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
  useDisclosure as useDrawerDisclosure,
    useDisclosure as useLoginDisclosure,
    IconButton,
  MenuButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';

import { Link } from "react-router-dom";

import links from "./data";
import Login from '../login/Login';

const MobileDrawer = () => {

  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDrawerDisclosure();
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
                  <Button variant="nav">{item.text}</Button>
                </Link>
              ))}
            </DrawerBody>

            <DrawerFooter>
              <Button onClick={() => {
                onOpenLogin();
                onCloseDrawer()
              }} >
              Login
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Login isOpenLogin={isOpenLogin} onCloseLogin={onCloseLogin} />
      </>
    );

}
export default MobileDrawer
