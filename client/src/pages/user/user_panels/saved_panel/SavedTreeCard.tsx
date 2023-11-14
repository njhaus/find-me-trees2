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

interface iSavedTreeCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
    collections: string[];
}

const SavedTreeCard = ({
  id,
  title,
  imgSrc,
  sciName,
  collections
}: iSavedTreeCard) => {
    const imageSource = useImg(imgSrc[0]);


   const handleAddToCol = (collection: string) => {
     console.log('add' + title, collection);
   };
  
  const handleRemove = () => {
    console.log('remove' + title)
  }


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
            <Flex width={"100%"} direction={'row'} justify={'space-evenly'} flexWrap={'wrap'} gap={'0.5rem'}>
                      <AddToColBtn collections={collections}
                          onAdd={handleAddToCol}
                      />
            <RemoveBtn title={title} onRemove={ handleRemove} />
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default SavedTreeCard;
