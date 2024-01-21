import { useRef } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Divider,
  ButtonGroup,
  Button,
    Heading,
  Flex,
  Box
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useImg } from "../../../../hooks/useImg";
import AddToColBtn from "./saved_tree_card/AddToColBtn";
import RemoveBtn from "./saved_tree_card/RemoveBtn";
import RemoveFromColButton from "./saved_tree_card/RemoveFromColButton";

interface iSavedTreeCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
  collections: string[];
  treeCollections: string[];
  currentCollection: string;
}

const SavedTreeCard = ({
  id,
  title,
  imgSrc,
  sciName,
  treeCollections,
  collections,
  currentCollection
}: iSavedTreeCard) => {
    const imageSource = imgSrc[0];
  
  return (
    <Card size={"sm"} w="16rem" align={"center"} borderRadius={"10px"}>
        <CardBody>
          <Heading size="md">{title}</Heading>
          <Image
            src={imageSource}
            alt={`Photo of ${title}`}
            borderRadius="lg"
            maxHeight={"12rem"}
            aspectRatio={"1/1"}
            objectFit={"cover"}
          />
          <Stack mt="1" spacing="0">
            <Text as={"h2"} color="main.300" fontSize="1.5rem">
              {title}
            </Text>
            <Text color="secondary.500" fontSize="1.25rem">
              {sciName}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Flex direction={"column"} align={"center"}>
            <Flex margin={"0.5rem"}>
              <Button variant="solidDark" size={"sm"}>
                <Link to={`/tree/${id}`}>View {title}</Link>
              </Button>
            </Flex>
            <Flex
              width={"100%"}
              direction={"row"}
              justify={"space-evenly"}
              flexWrap={"wrap"}
              gap={"0.5rem"}
            >
              {!treeCollections.includes(currentCollection) ? (
                <AddToColBtn collections={collections} id={id} />
              ) : (
                <RemoveFromColButton collection={currentCollection} id={id} />
              )}
              <RemoveBtn title={title} id={id} dataKey={"saved"} width="45%" />
            </Flex>
          </Flex>
        </CardFooter>
    </Card>
  );
};

export default SavedTreeCard;
