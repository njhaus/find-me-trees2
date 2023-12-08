import React from 'react'
import { iUserSaved } from '../../../../data/user_data/userData';
import { Grid, Text } from '@chakra-ui/react';
import SavedTreeCard from './SavedTreeCard';

interface iSavedCards {
  data: iUserSaved[];
  collections: string[];
  currentCollection: string;

}

const SavedCards = ({ data, collections, currentCollection }: iSavedCards) => {

  const displayCardsByCollection = currentCollection === 'all' ? data : data.filter(tree => tree.collections.includes(currentCollection));

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={"1rem"}
      margin={"1rem"}
    >
      {displayCardsByCollection?.length > 0 ? (
        displayCardsByCollection.map((tree, i) => (
          <SavedTreeCard
            key={i}
            id={tree._id._id}
            title={tree._id.title}
            imgSrc={tree._id.imgSrc}
            sciName={tree._id.sciName}
            // "treeCollections" are the collections this tree is saved to. "collections" are all available collections.
            treeCollections={tree.collections}
            collections={collections}
            currentCollection={currentCollection}
          />
        ))
      ) : (
        <Text>
          {currentCollection === "all"
            ? "You have not saved any trees"
            : `There are currently no trees in ${currentCollection}`}
        </Text>
      )}
    </Grid>
  );
}

export default SavedCards
