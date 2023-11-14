import {
    TabPanel,
    Flex,
  Button
} from "@chakra-ui/react";

import CollectionMenu from "./saved_panel/CollectionMenu";
import SavedCards from "./saved_panel/SavedCards";
import AddCollection from "./saved_panel/AddCollection";
import { iUserSaved } from "../../../data/user_data/userData";
import { useState } from "react";

interface iSavedPanel {
    data: iUserSaved[];
    collections: string[];
}

const SavedPanel = ({ data, collections }: iSavedPanel) => {
    
    const [currentCollection, setCurrentCollection] = useState('all');

    console.log(currentCollection);

    const handleCollection = (collection: string) => {
        setCurrentCollection(collection);
    }

    return (
      <TabPanel as={"article"} bg={'teal.200'}>
        <Flex direction={'column'}>
          <Flex direction={'row'} justify={'space-between'}>
                    <CollectionMenu
                        collections={collections}
                        onClick={handleCollection}
                    />
                    <AddCollection/>
          </Flex>
            </Flex>
            <Flex>
                <SavedCards/>
            </Flex>
      </TabPanel>
    );
};

export default SavedPanel;
