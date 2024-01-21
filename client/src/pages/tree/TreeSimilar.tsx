import { Flex, Heading, Image, Text } from "@chakra-ui/react"

interface iTreeSimilar {
    id: string
}

const TreeSimilar = ({id }: iTreeSimilar) => {
    return (
      <Flex
        as="section"
        bg={"main.900"}
        pt={"1rem"}
        pb={"3rem"}
        direction={"column"}
      >
        <Heading
          as={"h3"}
          color={"main.100"}
          fontSize={"2rem"}
          mx={"auto"}
          mb={"2rem"}
        >
          Similar Trees (Feature coming soon)
        </Heading>
        {/* Get trees from same family and map mini-cards... */}
        <Flex
          gap={"2rem"}
          overflowX={"auto"}
          px={'2rem'}
          justifyContent={{ base: 'start', lg: 'center' }}
        >
          <Flex
            direction={"column"}
            bg={"white"}
            padding={"0.5rem"}
            borderRadius={"5px"}
            minWidth={"8rem"}
          >
            <Image
              width={"8rem"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={"/filter-form/upright-branches.jpeg"}
            />
            <Text textAlign={"center"} color={"main.400"}>
              Placeholder Tree
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
}

export default TreeSimilar
