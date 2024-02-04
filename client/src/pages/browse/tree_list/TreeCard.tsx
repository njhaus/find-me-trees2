import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { filtersTextMap } from "../browse_data/filterData";
import { iFormData } from "../browse_data/filterFormData";

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
  const searchTermText = searchTerms ? Object.keys(searchTerms) : [];
  const searchTermValues = searchTerms ? Object.values(searchTerms) : [];

  return (
    <Card maxW="sm" w="100%" align={"center"}>
      <CardBody>
        <Box>
          <Image
            src={imgSrc}
            alt={`Photo of ${title}`}
            maxHeight={"15rem"}
            aspectRatio={"1/1"}
            objectFit={"cover"}
            borderRadius="lg"
          />
        </Box>
        <Stack mt="6" spacing="0">
          <Text as={"h2"} color="main.300" fontSize="1.5rem">
            {title}
          </Text>
          <Text color="secondary.500" fontSize="1.25rem">
            {sciName}
          </Text>
          {searchTermValues.every(
            (term) => term === undefined || term?.length < 1
          ) ? (
            ""
          ) : (
            <Text color={"accent.500"} mt={"0.5rem"}>
              Matches search terms
            </Text>
          )}
          {searchTerms &&
            searchTermText.map((term, i: number) => (
              <Text key={i} color={"accent.500"}>
                {searchTermValues[i] && searchTermValues[i]?.length > 0
                  ? `${filtersTextMap[term as keyof typeof filtersTextMap]}: ${
                      searchTermValues[i]
                    } `
                  : ""}
              </Text>
            ))}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solidDark">
            <Link to={`/tree/${id}`}>View {title}</Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TreeCard;
