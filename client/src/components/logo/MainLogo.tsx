import { Link } from "react-router-dom"
import { HStack, Image, Heading } from "@chakra-ui/react";

const MainLogo = () => {
  return (
    <Link to={"/"}>
      <HStack h={"100%"} bg={"transparent"} px={"1.5rem"} py={"0.5rem"}>
        <Image src={"/findmetreeslogo2.png"} h="50px" />
        <Heading
          as={"h2"}
          size={{ base: 'lg', md: 'md', lg: 'xl'}}
          minWidth={{ base: '12rem', md: '8rem'}}
          fontWeight={"300"}
          fontFamily={'main'}
        >
          Find Me Trees
        </Heading>
      </HStack>
    </Link>
  );
}

export default MainLogo
