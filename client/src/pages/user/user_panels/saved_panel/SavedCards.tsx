import React from 'react'
import { iUserSaved } from '../../../../data/user_data/userData';
import { Grid } from '@chakra-ui/react';
import SavedTreeCard from './SavedTreeCard';

interface iSavedCards {
  data: iUserSaved[];
  collections: string[];

}

const SavedCards = ({ data, collections }: iSavedCards) => {
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
      {data.map((tree, i) => (
        <SavedTreeCard
          key={i}
          id={tree._id._id}
          title={tree._id.title}
          imgSrc={tree._id.imgSrc}
          sciName={tree._id.sciName}
          collections={collections}
        />
      ))}
    </Grid>
  );
}

export default SavedCards
