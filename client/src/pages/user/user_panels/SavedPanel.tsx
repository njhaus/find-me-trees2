import { useState, useEffect } from "react";

import {
    TabPanel,
    Flex,
  Button
} from "@chakra-ui/react";

import CollectionMenu from "./saved_panel/CollectionMenu";
import SavedCards from "./saved_panel/SavedCards";
import AddCollection from "./saved_panel/AddCollection";
import { iUserSaved, iUserData } from "../../../data/user_data/userData";


interface iSavedPanel {
    data: iUserSaved[];
  collections: string[];
}

const SavedPanel = ({ data, collections}: iSavedPanel) => {
    
    const [currentCollection, setCurrentCollection] = useState('all');

    const handleCollection = (collection: string) => {
        setCurrentCollection(collection);
    }
  
  useEffect(() => {
    setCurrentCollection('all');
    }, [collections])

    return (
      <TabPanel as={"article"} bg={"teal.200"}>
        <Flex direction={"column"}>
          <Flex direction={"row"} justify={"space-between"}>
            <CollectionMenu
              currentCol={currentCollection}
              collections={collections}
              onClick={handleCollection}
            />
            <AddCollection
              collections={collections}
            />
          </Flex>
        </Flex>
        <Flex>
          <SavedCards
            data={data}
            collections={collections}
            currentCollection = {currentCollection}
          />
        </Flex>
      </TabPanel>
    );
};

export default SavedPanel;
