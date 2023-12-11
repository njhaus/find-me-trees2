import { Grid, Text } from "@chakra-ui/react";

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
      {data?.length > 0 ?
        data.map((tree, i) => (
        <FavoritesCard
          key={i}
          id={tree._id._id}
          title={tree._id.title}
          imgSrc={tree._id.imgSrc}
            sciName={tree._id.sciName}
            data={data}
        />
        ))
        :
        <Text>You have not saved any favorites yet.</Text>
      }
    </Grid>
  );
};

export default FavoritesList;
