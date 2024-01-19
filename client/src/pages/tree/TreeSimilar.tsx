import { Flex, Heading, Image, Text } from "@chakra-ui/react"

interface iTreeSimilar {
    id: string
}

const TreeSimilar = ({id }: iTreeSimilar) => {
    return (
      <Flex
        as="section"
        width={"100%"}
        overflowX={"scroll"}
        bg={"main.900"}
            p={"1rem"}
            direction={'column'}
      >
        <Heading
          as={"h3"}
          color={"main.100"}
          fontSize={"2rem"}
          mx={"auto"}
          mb={"2rem"}
        >
          Similar Trees
        </Heading>
        {/* Get trees from same family and map mini-cards... */}
        <Flex gap={'2rem'} justifyContent={'center'}>
          <Flex direction={"column"}>
            <Image
              width={"8rem"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={"/filter-form/upright-branches.jpeg"}
            />
            <Text color={'main.100'}>A tree</Text>
          </Flex>
          <Flex direction={"column"}>
            <Image
              width={"8rem"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={"/filter-form/upright-branches.jpeg"}
            />
            <Text color={'main.100'}>A tree</Text>
          </Flex>
          <Flex direction={"column"}>
            <Image
              width={"8rem"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={"/filter-form/upright-branches.jpeg"}
            />
            <Text color={'main.100'}>A tree</Text>
          </Flex>
          <Flex direction={"column"}>
            <Image
              width={"8rem"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={"/filter-form/upright-branches.jpeg"}
            />
            <Text color={'main.100'}>A tree</Text>
          </Flex>
          <Flex direction={"column"}>
            <Image
              width={"8rem"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              src={"/filter-form/upright-branches.jpeg"}
            />
            <Text color={'main.100'}>A tree</Text>
          </Flex>
        </Flex>
      </Flex>
    );
}

export default TreeSimilar
