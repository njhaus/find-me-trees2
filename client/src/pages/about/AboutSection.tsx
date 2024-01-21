import { Flex, Heading, VStack, Text, Image, Link } from "@chakra-ui/react";
import Boundary from "../../components/borders/Boundary";

interface iAboutSection {
  direction: "row" | "row-reverse";
  title: string;
  text: string;
  imgSrc: string;
  link?: string;
}

const AboutSection = ({ direction, title, text, imgSrc, link}: iAboutSection) => {

  const picRight = direction === 'row' ? { base: "-4rem", md: 0 } : '';
  const picLeft = direction === "row-reverse" ? { base: "-4rem", md: 0 } : '';

  return (
    <>
      <Flex
        as={"section"}
        direction={direction}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        m={"1rem"}
        gap={"2rem"}
        position={"relative"}
      >
        <VStack as={"article"} className="about-text">
          <Heading as={"h3"} py={'1rem'}>{title}</Heading>
          <Text>
            {text}{' '}
            {link && <Link href={link} target="_blank" color={'secondary.400'} _activeLink={{ color: 'accent.500' }} >{link?.split("/")[2]}</Link>}
          </Text>
        </VStack>
        <Image
          className="about-img"
          src={imgSrc}
          objectFit={"cover"}
          borderRadius={"50%"}
          width={{ base: "5rem", md: "10rem" }}
          aspectRatio={"1/1"}
          position={{ base: "absolute", md: "relative" }}
          top={{ base: "-2rem", md: 0 }}
          right={picRight}
          left={picLeft}
          backgroundColor={'white'}
        ></Image>
      </Flex>
      <Boundary color={"main.100"} width={"15rem"} height={"1px"} />
    </>
  );
};

export default AboutSection;
