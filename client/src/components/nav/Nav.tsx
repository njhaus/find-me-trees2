import { Image, Flex, Button, HStack, chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import Logo from "../public/vite.svg";
// import { Link } from "react-scroll";
import links from "./data";
import React from "react";

const CTA = "Get Started";

interface LinkProps {
    text: string,
    to: JSX.Element,
    key: number
}

export function Nav() {
    return (
      //   BROWSER Navbar
        <>
            <h1>Hello??</h1>
        <chakra.header id="header">
          <Flex w="100%" px="6" py="5" align="center" justify="space-between">
            {/* // Logo */}
            {/* <Image src={Logo.src} h="50px" /> */}
            {/* // Nav Items */}
            <HStack as="nav" spacing="5">
              {links.map((item, i) => (
                <Link key={i} to={item.to}>
                  {item.text}
                </Link>
              ))}
            </HStack>
            {/* // Call to action items */}
            <HStack>
              <Button>{CTA}</Button>
            </HStack>
          </Flex>
        </chakra.header>
      </>
    );
}

export default Nav;


// LINK to instructions: (Done with desktop version) https://www.raravind.com/blog/web-development/responsive-navigation-bar-using-chakraui