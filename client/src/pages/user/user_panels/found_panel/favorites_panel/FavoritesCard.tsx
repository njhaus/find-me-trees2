import {
  Image,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

interface iFavoritesCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
}

const FavoritesCard = ({id, title, imgSrc, sciName}: iFavoritesCard) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={imgSrc[0]}
        alt={`Photo of ${title}`}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2">{sciName}</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            <Link to={`/tree/${id}`}>View {title}</Link>
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default FavoritesCard;
