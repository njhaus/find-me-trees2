import { useEffect, useState } from "react";

import { Flex, TabPanel } from "@chakra-ui/react";

import { iUserSaved } from "../user_data/userData";
import AddCollection from "./saved_panel/AddCollection";
import CollectionMenu from "./saved_panel/CollectionMenu";
import SavedCards from "./saved_panel/SavedCards";

interface iSavedPanel {
  data: iUserSaved[];
  collections: string[];
}

const SavedPanel = ({ data, collections }: iSavedPanel) => {
  const [currentCollection, setCurrentCollection] = useState("all");

  const handleCollection = (collection: string) => {
    setCurrentCollection(collection);
  };

  useEffect(() => {
    setCurrentCollection("all");
  }, [collections]);

  return (
    <TabPanel
      as={"article"}
      bg={"secondary.200"}
      minHeight={"calc(100vh - 20rem)"}
    >
      <Flex direction={"column"} pt={"1rem"}>
        <Flex direction={"row"} justify={"space-between"}>
          <CollectionMenu
            currentCol={currentCollection}
            collections={collections}
            onClick={handleCollection}
          />
          <AddCollection collections={collections} />
        </Flex>
      </Flex>
      <Flex>
        <SavedCards
          data={data}
          collections={collections}
          currentCollection={currentCollection}
        />
      </Flex>
    </TabPanel>
  );
};

export default SavedPanel;
