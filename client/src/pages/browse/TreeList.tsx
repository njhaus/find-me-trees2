import { Text, Flex, Grid, GridItem } from "@chakra-ui/react"

import TreeCard from "./tree_list/TreeCard";

const TreeList = () => {
  return (
    <Flex direction={"column"} padding={{ base: 3, md: 6 }}>
      <Text>Search terms here</Text>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {/* MAP THESE WITH DATA */}
        <TreeCard
          title={'title placeholder'}
          imgSrc={'placeholder-2.jpeg'}
          sciName="sciname placeholder"
        />
        <TreeCard
          title={'title placeholder'}
          imgSrc={'placeholder-2.jpeg'}
          sciName="sciname placeholder"
        />
        <TreeCard
          title={'title placeholder'}
          imgSrc={'placeholder-2.jpeg'}
          sciName="sciname placeholder"
        />
        <TreeCard
          title={'title placeholder'}
          imgSrc={'placeholder-2.jpeg'}
          sciName="sciname placeholder"
        />
        <TreeCard
          title={'title placeholder'}
          imgSrc={'placeholder-2.jpeg'}
          sciName="sciname placeholder"
        />
      </Grid>
    </Flex>
  );
}

export default TreeList
