import { useContext } from "react";

import { Text, Flex, Grid, GridItem } from "@chakra-ui/react";

import TreeCard from "./tree_list/TreeCard";
import { FormDataContext, iFormDataContext } from "./Browse";

const TreeList = () => {
  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

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
          id={"1"}
          title={"title placeholder"}
          imgSrc={"placeholder-2.jpeg"}
          sciName="sciname placeholder"
          searchTerms={formData}
        />
        <TreeCard
          id={"1"}
          title={"title placeholder"}
          imgSrc={"placeholder-2.jpeg"}
          sciName="sciname placeholder"
          searchTerms={formData}
        />
        <TreeCard
          id={"1"}
          title={"title placeholder"}
          imgSrc={"placeholder-2.jpeg"}
          sciName="sciname placeholder"
          searchTerms={formData}
        />
        <TreeCard
          id={"1"}
          title={"title placeholder"}
          imgSrc={"placeholder-2.jpeg"}
          sciName="sciname placeholder"
          searchTerms={formData}
        />
        <TreeCard
          id={"1"}
          title={"title placeholder"}
          imgSrc={"placeholder-2.jpeg"}
          sciName="sciname placeholder"
          searchTerms={formData}
        />
      </Grid>
    </Flex>
  );
};

export default TreeList;
