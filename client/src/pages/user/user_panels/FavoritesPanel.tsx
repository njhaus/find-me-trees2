import { useState } from "react";

import { TabPanel, Flex, Button, Box } from "@chakra-ui/react";
import { iUserFavorites } from "../../../data/user_data/userData";

import Carousel from "../../../components/ui-components/Carousel";
import FavoritesList from "./favorites_panel/FavoritesList";

interface iFavoritesPanel {
  favorites: iUserFavorites[];
}

const FavoritesPanel = ({ favorites }: iFavoritesPanel) => {
  const [playSlideshow, setPlaySlideshow] = useState(false);

  const imgs = favorites.map((tree, i) => tree._id.imgSrc[0]);

  return (
    <TabPanel
      as={"article"}
      bg={"accent.400"}
      overflow={"hidden"}
      padding={0}
    >
      <Flex direction={"column"} padding={"1rem"}>
        <Button
          width={"10rem"}
          onClick={() => setPlaySlideshow(!playSlideshow)}
        >
          {playSlideshow ? "Stop" : "Play"} Slideshow
        </Button>
        {playSlideshow && (
          <Flex padding={"1rem"} justifyContent={"center"} marginY={"1rem"}>
            <Box maxHeight={"30rem"} maxWidth={"30rem"}>
              <Carousel imgs={imgs} />
            </Box>
          </Flex>
        )}

        {!playSlideshow && (
          <Flex width={"100%"} justify={"center"} marginY={"1rem"}>
            <Flex bg={"yellow.300"} padding={"1rem"} direction={"column"}>
              <FavoritesList data={favorites} />
            </Flex>
          </Flex>
        )}
      </Flex>
    </TabPanel>
  );
};

export default FavoritesPanel;
