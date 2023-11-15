import { Grid } from "@chakra-ui/react";

import FavoritesCard from "./FavoritesCard";
import { iTreeData } from "../../../../../data/tree_data";

interface iFavoritesList {
  data: iTreeData[];
}

const FavoritesList = ({ data }: iFavoritesList) => {
  console.log(data);
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      gap={"1rem"}
    >
      {data.map((tree, i) => (
        <FavoritesCard
          key={i}
          id={tree.id}
          title={tree.title}
          imgSrc={tree.imgSrc}
          sciName={tree.sciName}
        />
      ))}
    </Grid>
  );
};

export default FavoritesList;
