import { Grid } from "@chakra-ui/react";

import { iUserSaved } from "../../../../data/user_data/userData";
import FoundCard from "./FoundCard";
import { iTreeData } from "../../../../data/tree_data";

interface iFoundList {
    data: iTreeData[];
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
          id={tree.id}
          title={tree.title}
          imgSrc={tree.imgSrc}
          sciName={tree.sciName}
        />
      ))}
    </Grid>
  );
}

export default FoundList
