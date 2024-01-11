import { Link } from "react-router-dom"
import { HStack, Image, Heading } from "@chakra-ui/react";

const MainLogo = () => {
  return (
    <Link to={"/"}>
      <HStack
          h={'100%'}
        bg={'transparent'}
        px={'1.5rem'}
        py={'0.5rem'}

      >
        <Image src={"../../../public/findmetreeslogo2.png"} h="50px" />
        <Heading
          as={'h2'}
          size={'xl'}
          fontWeight={'300'}
        >Find Me Trees</Heading>
      </HStack>
    </Link>
  );
}

export default MainLogo
