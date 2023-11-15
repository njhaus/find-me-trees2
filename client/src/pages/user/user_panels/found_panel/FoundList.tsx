import { Grid } from "@chakra-ui/react";

import { iUserFound } from "../../../../data/user_data/userData";
import FoundCard from "./FoundCard";
import { iTreeData } from "../../../../data/tree_data";

interface iFoundList {
  data: iUserFound[];
  location: string;
}

const FoundList = ({ data, location }: iFoundList) => {
    
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: "repeat(2, 1fr)",
        lg: "1fr",
      }}
    >
      {data.map((tree, i) => (
        <FoundCard
          key={i}
          id={tree.tree.id}
          title={tree.tree.title}
          imgSrc={tree.tree.imgSrc}
          sciName={tree.tree.sciName}
        />
      ))}
    </Grid>
  );
}

export default FoundList
