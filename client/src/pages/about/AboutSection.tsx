import { Flex, Heading, VStack, Text, Image, Divider } from "@chakra-ui/react";
import Boundary from "../../components/borders/Boundary";

interface iAboutSection {
  direction: "row" | "row-reverse";
}

const AboutSection = ({ direction }: iAboutSection) => {

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
          <Heading as={"h3"}>Lorem Ipsum</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            omnis eligendi beatae. Consequuntur obcaecati, magnam nam velit,
            distinctio nobis architecto accusamus soluta tenetur ab aperiam
            temporibus. Deleniti incidunt magni dolore!
          </Text>
        </VStack>
        <Image
          className="about-img"
          src={"/tree-hands.jpeg"}
          objectFit={"cover"}
          borderRadius={"50%"}
          width={{ base: "5rem", md: "10rem" }}
          aspectRatio={"1/1"}
          position={{ base: "absolute", md: "relative" }}
          top={{ base: "-2rem", md: 0 }}
          right={picRight}
          left={picLeft}
        ></Image>
      </Flex>
      <Boundary color={"main.100"} width={"15rem"} height={"1px"} />
    </>
  );
};

export default AboutSection;
