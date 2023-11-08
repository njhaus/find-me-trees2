import { Link } from "react-router-dom"
import { HStack, Image, Heading } from "@chakra-ui/react";

const MainLogo = () => {
  return (
    <Link to={"/"}>
      <HStack>
        <Image src={"../../../src/assets/react.svg"} h="50px" />
        <Heading as={'h2'} size={'xl'}>Find Me Trees</Heading>
      </HStack>
    </Link>
  );
}

export default MainLogo
