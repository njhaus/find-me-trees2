import { Grid } from "@chakra-ui/react";

import FavoritesCard from "./FavoritesCard";
import { iUserFavorites } from "../../../../data/user_data/userData";

interface iFavoritesList {
  data: iUserFavorites[];
}

const FavoritesList = ({ data }: iFavoritesList) => {
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
          id={tree.tree.id}
          title={tree.tree.title}
          imgSrc={tree.tree.imgSrc}
          sciName={tree.tree.sciName}
        />
      ))}
    </Grid>
  );
};

export default FavoritesList;
