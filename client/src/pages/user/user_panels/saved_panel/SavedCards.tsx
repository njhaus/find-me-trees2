import React from 'react'
import { iUserSaved } from '../../../../data/user_data/userData';
import { Grid } from '@chakra-ui/react';
import SavedTreeCard from './SavedTreeCard';

interface iSavedCards {
  data: iUserSaved[];
  collections: string[];

}

const SavedCards = ({ data, collections }: iSavedCards) => {
  console.log(data);
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={'1rem'}
      margin={'1rem'}
    >
      {data.map((tree, i) => (
        <SavedTreeCard
        key={i}
          id={ tree.tree.id}
          title={tree.tree.title}
          imgSrc={tree.tree.imgSrc}
          sciName={tree.tree.sciName}
          collections={collections}
        />
      ))}
    </Grid>
  );
}

export default SavedCards
