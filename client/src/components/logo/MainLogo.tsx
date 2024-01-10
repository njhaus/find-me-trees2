import { Link } from "react-router-dom"
import { HStack, Image, Heading } from "@chakra-ui/react";

const MainLogo = () => {
  return (
    <Link to={"/"}>
      <HStack
          h={'100%'}
        bg={'rgb(235, 234, 207)'}
        px={'1rem'}
        py={'0.5rem'}
      >
        <Image src={"../../../public/findmetreeslogo2.png"} h="50px" />
        <Heading as={'h2'} size={'xl'}>Find Me Trees</Heading>
      </HStack>
    </Link>
  );
}

export default MainLogo
