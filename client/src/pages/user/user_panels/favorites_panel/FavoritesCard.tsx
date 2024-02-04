import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { iUserFavorites } from "../../user_data/userData";
import RemoveBtn from "../saved_panel/saved_tree_card/RemoveBtn";
import FavoriteNotes from "./FavoriteNotes";

interface iFavoritesCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
  data: iUserFavorites[];
}

const FavoritesCard = ({
  id,
  title,
  imgSrc,
  sciName,
  data,
}: iFavoritesCard) => {
  return (
    <Card direction={{ base: "row" }} w={"18rem"} borderRadius={"10px"}>
      <Stack className="blur-border-light" borderRadius={"10px"}>
        <CardBody py={"0.5rem"}>
          <Flex direction={"row-reverse"}>
            <VStack justifyContent={"center"} alignItems={"center"}>
              <Heading size="md" color={"main.200"}>
                {title}
              </Heading>
              <Text variant={"teeny"} color={"main.500"}>
                {sciName}
              </Text>
              <FavoriteNotes data={data} id={id} />
            </VStack>
            <Image
              objectFit="cover"
              width={"7.5rem"}
              height={"7.5rem"}
              src={imgSrc[0]}
              alt={`Photo of ${title}`}
              borderRadius={"50%"}
              aspectRatio={"1/1"}
              transform={"translate(-0.75rem, 0rem)"}
              border={"2px solid black"}
            />
          </Flex>
        </CardBody>

        <CardFooter>
          <Flex direction={"column"} gap="0.5rem">
            <Button variant="solidDark" size="sm">
              <Link to={`/tree/${id}`}>View {title}</Link>
            </Button>
            <RemoveBtn title={title} id={id} dataKey={"favorites"} size="sm" />
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default FavoritesCard;
