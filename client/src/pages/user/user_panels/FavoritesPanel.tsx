import { useState } from "react";

import { Box, Button, Flex, TabPanel } from "@chakra-ui/react";
import { iUserFavorites } from "../../../data/user_data/userData";

import { BsX } from "react-icons/bs";
import Carousel from "../../../components/ui-components/Carousel";
import FavoritesList from "./favorites_panel/FavoritesList";

interface iFavoritesPanel {
  favorites: iUserFavorites[];
}

const FavoritesPanel = ({ favorites }: iFavoritesPanel) => {
  const [playSlideshow, setPlaySlideshow] = useState(false);

  const imgs = favorites.map((tree) => tree._id.imgSrc[0]);

  return (
    <TabPanel
      as={"article"}
      bg={"secondary.200"}
      overflow={"hidden"}
      padding={0}
      minHeight={"calc(100vh - 20rem)"}
    >
      <Flex direction={"column"} padding={"1rem"}>
        <Button
          width={"10rem"}
          onClick={() => setPlaySlideshow(!playSlideshow)}
        >
          {playSlideshow ? "Stop" : "Play"} Slideshow
        </Button>
        {playSlideshow && (
          <Box position="relative">
            <Box
              width={"100vw"}
              height={"100vh"}
              bg={"#aaaaaaaa"}
              position={"fixed"}
              top={0}
              left={0}
              zIndex={10}
              onClick={() => {
                setPlaySlideshow(!playSlideshow);
              }}
            ></Box>
            <Flex
              justifyContent={"center"}
              marginY={"1rem"}
              position={"fixed"}
              top={"50vh"}
              left={"50vw"}
              transform={"translate(-50%, -50%)"}
              width={"30rem"}
              zIndex={11}
              boxShadow={"0px 0px 8px black"}
              borderRadius={"5px"}
            >
              <Button
                variant={"icon"}
                position={"fixed"}
                top={"-3rem"}
                right={"-3rem"}
                zIndex={20}
                onClick={() => {
                  setPlaySlideshow(!playSlideshow);
                }}
              >
                <BsX fontSize={"2rem"} />
              </Button>
              <Box maxHeight={"30rem"} maxWidth={"30rem"}>
                <Carousel imgs={imgs} />
              </Box>
            </Flex>
          </Box>
        )}

        {!playSlideshow && <FavoritesList data={favorites} />}
      </Flex>
    </TabPanel>
  );
};

export default FavoritesPanel;
