import { Image, Card, Stack, CardBody, CardFooter, Text, Heading, Button, Flex } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import RemoveBtn from "../saved_panel/saved_tree_card/RemoveBtn";
import { iLocationData } from "../../../../data/user_data/userData";

interface iFoundCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
  locationFound: iLocationData
}

const FoundCard = ({id, title, imgSrc, sciName, locationFound}: iFoundCard) => {
  
  return (
    <Card direction={{ base: "row" }} overflow="hidden" variant="outline">
      <Image
        objectFit="cover"
        maxW={"5rem"}
        src={imgSrc[0]}
        alt={`Photo of ${title}`}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2">{sciName}</Text>
          {/* <Text>Found at { locationFound.coordinates[0].toString() + ', ' + locationFound.coordinates[1].toString()}</Text> */}
        </CardBody>

        <CardFooter>
          <Flex direction={'column'}>
            <Button variant="solid" colorScheme="blue">
              <Link to={`/tree/${id}`}>View {title}</Link>
            </Button>
            <RemoveBtn title={title} id={id} dataKey={"found"} />
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default FoundCard
