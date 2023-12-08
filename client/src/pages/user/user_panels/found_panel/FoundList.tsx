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
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "1fr",
      }}
    >
      {data.map((tree, i) => (
        <FoundCard
          key={i}
          id={tree._id._id}
          title={tree._id.title}
          imgSrc={tree._id.imgSrc}
          sciName={tree._id.sciName}
        />
      ))}
    </Grid>
  );
}

export default FoundList
