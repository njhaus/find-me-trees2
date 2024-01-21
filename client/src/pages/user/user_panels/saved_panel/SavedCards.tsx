import React from 'react'
import { iUserSaved } from '../../../../data/user_data/userData';
import { Flex, Text } from '@chakra-ui/react';
import SavedTreeCard from './SavedTreeCard';

interface iSavedCards {
  data: iUserSaved[];
  collections: string[];
  currentCollection: string;

}

const SavedCards = ({ data, collections, currentCollection }: iSavedCards) => {

  const displayCardsByCollection = currentCollection === 'all' ? data : data.filter(tree => tree.collections.includes(currentCollection));

  return (
    <Flex
      w={"100%"}
      p={"2rem"}
      direction={"row"}
      flexWrap={"wrap"}
      gap={"1.5rem"}
      justifyContent={"center"}
      margin={"1rem"}
      minHeight={"calc(100vh - 25rem)"}
      color={"white"}
      fontWeight={"500"}
      py={"2rem"}
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
            : `There are currently no trees in the collection ${currentCollection}`}
        </Text>
      )}
    </Flex>
  );
}

export default SavedCards
