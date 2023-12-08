import { Image, Card, Stack, CardBody, CardFooter, Text, Heading, Button, Flex } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import RemoveBtn from "../saved_panel/saved_tree_card/RemoveBtn";

interface iFoundCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
}

const FoundCard = ({id, title, imgSrc, sciName}: iFoundCard) => {
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
