import { useState } from "react";

import { Text, Flex, Grid, Button } from "@chakra-ui/react";

import TreeCard from "./tree_list/TreeCard";
import { iTreeData } from "../tree/data/tree_data";
import { iFormData } from "./browse_data/filterFormData";
import { filtersTextMap } from "./browse_data/filterData";

interface iTreeList {
  filteredTrees: iTreeData[];
  searchTerms: iFormData;
}

const TreeList = ({ filteredTrees, searchTerms }: iTreeList) => {
  // Load number
  const [loadNum, setLoadnum] = useState(12);

  // List the search terms
  const getSearchText = () => {
    let text = "";
    for (let term in searchTerms) {
      if (searchTerms[term]) {
        text = text.concat(
          "",
          `${filtersTextMap[term as keyof typeof filtersTextMap]}: ${
            searchTerms[term]
          }, `
        );
      }
    }
    return text.slice(0, -2);
  };

  const searchText = getSearchText();

  return (
    <Flex
      direction={"column"}
      padding={{ base: 3, md: 6 }}
      bg={"main.900"}
      flexGrow={1}
    >
      {filteredTrees.length < 1 ? (
        <Text>
          No trees matching search terms were found with search terms:{" "}
          {searchText}.
        </Text>
      ) : Object.values(searchTerms).some((val) => val?.length > 0) ? (
        <Text>
          {filteredTrees.length} tree{filteredTrees.length !== 1 && "s"} found
          with search terms: {searchText}.
        </Text>
      ) : (
        <Text>Use the filters to narrow your search</Text>
      )}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
        my={"1rem"}
      >
        {filteredTrees.slice(0, loadNum).map((tree) => (
          <TreeCard
            key={tree._id}
            id={tree._id}
            title={tree.title}
            imgSrc={tree.imgSrc[0]}
            sciName={tree.sciName}
            searchTerms={searchTerms}
          />
        ))}
      </Grid>
      {loadNum < filteredTrees.length && (
        <Button
          variant="outlineDark"
          mx={"auto"}
          my={"1rem"}
          onClick={() => setLoadnum(loadNum + 12)}
        >
          Load More
        </Button>
      )}
    </Flex>
  );
};

export default TreeList;
