import { useState } from "react";

import { TabPanel, Flex, Button } from "@chakra-ui/react";
import { iTreeData } from "../../../data/tree_data";

import Carousel from "../../../components/ui-components/Carousel";
import FavoritesList from "./found_panel/favorites_panel/FavoritesList";

interface iFavoritesPanel {
  favorites: iTreeData[];
}

const FavoritesPanel = ({ favorites }: iFavoritesPanel) => {
    
    const [playSlideshow, setPlaySlideshow] = useState(false)

    const imgs = favorites.map((tree, i) => (tree.imgSrc[0]));

    console.log(imgs)

  return (
    <TabPanel
      as={"article"}
      bg={"orange.200"}
      maxHeight={"100vh"}
      overflow={"hidden"}
      padding={0}
    >
      <Flex direction={"column"}>
        <Button onClick={() => setPlaySlideshow(!playSlideshow)}>
          {playSlideshow ? "Stop" : "Play"} Slideshow
        </Button>
        {playSlideshow && (
          <Flex>
            <Carousel imgs={imgs} />
          </Flex>
        )}

        {!playSlideshow && (
          <Flex >
            <FavoritesList data={favorites} />
          </Flex>
        )}
      </Flex>
    </TabPanel>
  );
};

export default FavoritesPanel;
