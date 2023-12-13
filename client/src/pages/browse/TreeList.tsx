import { useContext } from "react";

import { Text, Flex, Grid, GridItem } from "@chakra-ui/react";

import TreeCard from "./tree_list/TreeCard";
import { FormDataContext, iFormDataContext } from "./Browse";
import { iTreeData } from "../../data/tree_data";
import { iFormData } from "../../data/browse_data/filterFormData";

interface iTreeList {
  filteredTrees: iTreeData[],
  searchTerms: iFormData
}

const TreeList = ({ filteredTrees, searchTerms}: iTreeList) => {
  
  return (
    <Flex direction={"column"} padding={{ base: 3, md: 6 }}>
      {(filteredTrees.length < 1) ?
        <Text>No trees matching search terms were found.</Text> :
        Object.values(searchTerms).some(val => val?.length > 0) ? 
          <Text>{filteredTrees.length} trees found with search terms.</Text> :
          <Text>Use the filters to narrow your search</Text>
      } 
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {
          filteredTrees.map((tree) => (
            <TreeCard
              key={tree._id}
              id={tree._id}
              title={tree.title}
              imgSrc={tree.imgSrc[0]}
              sciName={tree.sciName}
              searchTerms={searchTerms}
            />
          ))
        }
      </Grid>
    </Flex>
  );
};

export default TreeList;
