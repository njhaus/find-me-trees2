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
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useImg } from "../../../hooks/useImg";
import { iFormData } from "../../../data/browse_data/filterFormData";

interface TreeCardProps {
  id: string;
  title: string;
  imgSrc: string;
  sciName: string;
  searchTerms: iFormData;
}

const TreeCard = ({
  id,
  title,
  imgSrc,
  sciName,
  searchTerms,
}: TreeCardProps) => {
  const imageSource = useImg(imgSrc);

  const searchTermText = searchTerms ? Object.keys(searchTerms) : [];
  const searchTermValues = searchTerms ? Object.values(searchTerms) : [];

  return (
    <Card maxW="sm" w="100%" align={"center"}>
      <CardBody>
        <Heading size="md">{title}</Heading>
        <Image src={imageSource} alt={`Photo of ${title}`} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Text color="blue.600" fontSize="2xl">
            {sciName}
          </Text>
          {searchTermValues.every((term) => term === null) ? (
            ""
          ) : (
            <Text>Matches search terms:</Text>
          )}
          {searchTerms &&
            searchTermText.map((term, i) => (
              <Text key={i}>
                {searchTermValues[i] !== null
                  ? `${term}: ${searchTermValues[i]} `
                  : ""}
              </Text>
            ))}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            <Link to={`/tree/${id}`}>View {title}</Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TreeCard;
