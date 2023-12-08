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
  Flex
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
    <Card maxW="sm" w="100%" align={"center"}>
      <CardBody>
        <Heading size="md">{title}</Heading>
        <Image src={imageSource} alt={`Photo of ${title}`} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Text color="blue.600" fontSize="2xl">
            {sciName}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex direction={"column"} align={"center"}>
          <Flex margin={"0.5rem"}>
            <Button variant="solid" colorScheme="blue">
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
            <RemoveBtn title={title} id={id} dataKey={'saved'} />
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default SavedTreeCard;
