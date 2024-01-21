import { Flex, Text } from "@chakra-ui/react";

import FavoritesCard from "./FavoritesCard";
import { iUserFavorites } from "../../../../data/user_data/userData";

interface iFavoritesList {
  data: iUserFavorites[];
}

const FavoritesList = ({ data }: iFavoritesList) => {
  return (
    <Flex
      w={'100%'}
      p={'2rem'}
      direction={'row'}
      flexWrap={'wrap'}
      gap={"1.5rem"}
      justifyContent={'center'}
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
        <Text color={'white'} fontWeight={'500'}>You have not saved any favorites yet.</Text>
      }
    </Flex>
  );
};

export default FavoritesList;
