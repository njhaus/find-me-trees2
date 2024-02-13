import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { iLocationData } from "../../user_data/userData";
import RemoveFoundBtn from "./RemoveFoundBtn";

interface iFoundCard {
  id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
  locationFound: iLocationData;
}

const FoundCard = ({
  id,
  title,
  imgSrc,
  sciName,
  locationFound,
}: iFoundCard) => {
  return (
    <Card
      direction={{ base: "row" }}
      overflow="hidden"
      w={"18rem"}
      borderRadius={"10px"}
      height="fit-content"
    >
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
              <Text color={"accent.500"}>
                Found at{" "}
                {locationFound.coordinates[1].toFixed(2).toString() +
                  ", " +
                  locationFound.coordinates[0].toFixed(2).toString()}
              </Text>
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
        <CardFooter pt={"0.5rem"} borderTop={"1px solid black"}>
          <VStack w={"100%"} alignItems={"center"}>
            <Button variant="solidDark" size={"sm"}>
              <Link to={`/tree/${id}`}>View {title}</Link>
            </Button>
            <RemoveFoundBtn
              title={title}
              id={id}
              locationFound={locationFound}
            />
          </VStack>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default FoundCard;
